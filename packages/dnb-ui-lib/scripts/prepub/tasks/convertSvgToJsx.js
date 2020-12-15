/**
 * Prepublish Task
 *
 */

import fs from 'fs-extra'
import path from 'path'
import del from 'del'
import gulp from 'gulp'
import rename from 'gulp-rename'
import transform from 'gulp-transform'
import svgr from '@svgr/core'
import prettier from 'prettier'
import globby from 'globby'
import { iconCase } from '../../../src/components/icon'
import { asyncForEach } from '../../tools'
import { log } from '../../lib'
import { md5 } from '../../figma/helpers/docHelpers'
import {
  IconsConfig,
  readIconsLockFile,
  saveIconsLockFile
} from '../../figma/tasks/assetsExtractors'
import packpath from 'packpath'

const ROOT_DIR = packpath.self()

export default async function convertSvgToJsx({
  srcPath = ['./assets/icons/*.svg'],
  destPath = './src/icons',
  preventDelete = false
} = {}) {
  log.start('> PrePublish: converting svg to jsx')

  try {
    if (!preventDelete) {
      await del([`${destPath}/**/*.js`, `!${destPath}`], {
        force: true
      })
    }

    // make sure transformSvgToReact runs first, so icons gets filled before we run makeIconsEntryFiles
    await transformSvgToReact({ srcPath, destPath })

    const icons = await makeIconsEntryFiles({
      srcPath,
      destPath
    })

    log.succeed(
      `> PrePublish: Converting "svg to jsx" is done (${icons.length} icons)`
    )
  } catch (e) {
    log.fail('Failed to run the convertSvgToJsx process')
    throw new Error(e)
  }
}

const transformSvgToReact = ({ srcPath, destPath }) =>
  new Promise((resolve, reject) => {
    try {
      gulp
        .src(srcPath, { cwd: ROOT_DIR })
        .pipe(transform('utf8', transformToJsx))
        .pipe(
          rename({
            extname: '.js'
          })
        )
        .pipe(gulp.dest(destPath, { cwd: ROOT_DIR }))
        .on('end', resolve)
        .on('error', reject)
    } catch (e) {
      reject(e)
    }
  })

const transformToJsx = (content, file) => {
  if (String(content).trim().length === 0) {
    fs.unlinkSync(file.path)
    return Promise.resolve('')
  }
  const basename = path.basename(file.path)
  const filename = basename.replace(path.extname(file.path), '')
  const componentName = iconCase(filename)
  try {
    content = content.replace(
      /clip[0-9]+/g,
      `clip-${md5(filename).substring(0, 6)}`
    )
    return new Promise((resolve, reject) =>
      svgr(
        content,
        {
          ids: true, //do not remove IDs from the syntax
          prettier: false // we use our own prettier version here
        },
        { componentName }
      )
        .then((res) => {
          log.info(`> PrePublish: Icon was converted: ${basename}`)
          resolve(
            '/** This file is auto generated by convertSvgToJsx.js */\n\n' +
              prettier
                .format(res, {
                  ...prettierrc,
                  parser: 'babel'
                })
                // This is a fix, so the Rollup ESM export does export React.createElement, and not only createElement with a named import
                .replace(
                  new RegExp(`import \\* as React from 'react'`, 'g'),
                  `import React from 'react'`
                )
          )
        })
        .catch(reject)
    )
  } catch (e) {
    log.fail(
      `> PrePublish: convertSvgToJsx convertion of "${basename}" failed`
    )
    throw e
  }
}

const makeIconsEntryFiles = async ({
  srcPath,
  destPath,
  delteOldFiles = false
}) => {
  // get all the svg icons we find
  const icons = (await globby(srcPath))
    .map((file) => {
      const basename = path.basename(file)
      const filename = basename.replace(path.extname(file), '')
      const name = iconCase(filename)
      return {
        name,
        filename,
        basename
      }
    })
    .sort(({ name: a }, { name: b }) => (a > b ? 1 : -1))

  // get the svg lock file
  const { iconsLockFile } = IconsConfig()
  const lockFileContent = await readIconsLockFile({ file: iconsLockFile })

  // from the svg lock file we can generate groups out of the "bundleName"
  const groups = Object.entries(lockFileContent).reduce(
    (acc, [file, { bundleName }]) => {
      acc[bundleName] = acc[bundleName] || []
      const basename = path.basename(file)
      const filename = basename.replace(path.extname(file), '')

      // make sure the file actually exists
      if (
        fs.existsSync(path.resolve(ROOT_DIR, destPath, `${filename}.js`))
      ) {
        acc[bundleName].push({
          filename,
          basename,
          name: iconCase(filename)
        })
      }

      return acc
    },
    {}
  )

  // found on disk as svg files, but was not in the lock file
  const notFoundInLockFile = icons.reduce((acc, cur) => {
    if (!lockFileContent[cur.basename]) {
      acc.push(cur)
    }
    return acc
  }, [])

  if (notFoundInLockFile && notFoundInLockFile.length > 0) {
    const listNotFoundInLockFile = notFoundInLockFile
      .map(({ basename }) => basename)
      .join(', ')

    log.info(
      `> PrePublish: Files where not found in the icons-svg.lock file: ${listNotFoundInLockFile}`
    )

    if (delteOldFiles) {
      await asyncForEach(
        notFoundInLockFile,
        async ({ basename, filename }) => {
          // delete svg file
          const cleanSrcPath = Array.isArray(srcPath)
            ? srcPath[0]
            : srcPath
          const svgFile = path.resolve(
            path.resolve(
              ROOT_DIR,
              /\*/.test(cleanSrcPath)
                ? path.dirname(cleanSrcPath)
                : cleanSrcPath
            ),
            basename
          )
          if (fs.existsSync(svgFile)) {
            // remove the svg entry in the lock file
            // we will save the new state afterwards
            delete lockFileContent[basename]
            await del(svgFile)
            log.info(`> PrePublish: Deleted ${basename}`)
          }

          // delete jsx file
          const cleanDestPath = Array.isArray(destPath)
            ? destPath[0]
            : destPath
          const jsxFile = path.resolve(
            path.resolve(
              ROOT_DIR,
              /\*/.test(cleanDestPath)
                ? path.dirname(cleanDestPath)
                : cleanDestPath
            ),
            `${filename}.js`
          )
          if (fs.existsSync(jsxFile)) {
            await del(jsxFile)
            log.info(`> PrePublish: Deleted ${filename}.js`)
          }
        }
      )

      // since we change the lock file content, we update it with the newest lock content
      const { iconsLockFile } = IconsConfig()
      await saveIconsLockFile({
        file: iconsLockFile,
        data: lockFileContent
      })
    }
  }

  // the index.js file will contain "all icons"
  // even the ones which dont exists in the lock file
  // this is in contrast to the "groups", they will only contain the icons, deticated to the current figma document
  const _imports = icons
    .map(({ name, filename }) => `import ${name} from './${filename}.js'`)
    .join('\n')
  const _keys = icons.map(({ name }) => name).join(', ')

  const indexContent = prettier.format(
    `/** This file is auto generated by convertSvgToJsx.js */

      ${_imports}

      export { ${_keys} }
  `,
    {
      ...prettierrc,
      parser: 'babel'
    }
  )

  try {
    const indexFile = path.resolve(ROOT_DIR, destPath, `index.js`)
    await fs.writeFile(indexFile, indexContent)

    await asyncForEach(
      Object.entries(groups),
      async ([groupName, entries]) => {
        entries = entries.sort(({ name: a }, { name: b }) =>
          a > b ? 1 : -1
        )
        const groupFile = path.resolve(
          ROOT_DIR,
          destPath,
          `${groupName}.js`
        )

        const _imports = entries
          .map(
            ({ name, filename }) =>
              `import ${name} from './${filename}.js'`
          )
          .join('\n')
        const _keys = entries.map(({ name }) => name).join(', ')

        const groupFileContent = prettier.format(
          `/** This file is auto generated by convertSvgToJsx.js */

            ${_imports}

            export { ${_keys} }
          `,
          {
            ...prettierrc,
            parser: 'babel'
          }
        )

        await fs.writeFile(groupFile, groupFileContent)
      }
    )
  } catch (e) {
    throw new Error(e)
  }

  return icons
}

const prettierrc = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../../../.prettierrc'), 'utf-8')
)

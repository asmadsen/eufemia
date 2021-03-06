/**
 * Scripts test
 *
 */

import nodePath from 'path'
import { createTypes } from '../generateTypes'

describe('generateTypes', () => {
  it('has to match snapshot', async () => {
    const docsDir = nodePath.resolve(
      __dirname,
      '../generateTypes/__tests__',
      '__mocks__'
    )
    const file = nodePath.resolve(docsDir, 'PrimaryComponent.js')
    const [{ destFile, definitionContent }] = await createTypes([file], {
      isTest: true,
      docsDir,
      findFiles: ['PrimaryComponent.md']
    })

    expect(destFile).toContain('__mocks__/PrimaryComponent.d.ts')
    expect(definitionContent).toMatchSnapshot()
  })
})

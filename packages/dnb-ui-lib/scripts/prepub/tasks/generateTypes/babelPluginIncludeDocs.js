export function babelPluginIncludeDocs(plugin, { docs }) {
  if (!docs) {
    return {} // stop here
  }

  return {
    visitor: {
      ModuleDeclaration(path) {
        path.traverse({
          Identifier(path) {
            if (path.parent.type === 'TSInterfaceDeclaration') {
              if (!path.parentPath.parentPath.node.leadingComments) {
                path.parentPath.parentPath.insertBefore(
                  path.parentPath.parentPath.addComment(
                    'leading',
                    `*\n * NB: Do not change the docs (comments) in here. The docs are updated during build time by "generateTypes.js" and "fetchPropertiesFromDocs.js".\n `
                  )
                )
              }
            }
            if (path.parent.type === 'TSPropertySignature') {
              if (path.node.name) {
                path.parent.trailingComments = null
                path.parent.leadingComments = null
                inserDocs(path, path.node.name, docs)
              }
            }
          }
        })
      },

      // Do we need this? No, because we are after babel, and do not get a class anymore!
      // ClassProperty(path) {
      //   if (path.node.key && path.node.key.name === 'propTypes') {
      //     path.traverse({
      //       ObjectProperty(path) {
      //         if (path.node.key.name === 'propTypes') {
      //           if (path.node.key) {
      //             inserDocs(path, path.node.key.name, docs)
      //           }
      //         }
      //       }
      //     })
      //   }

      ObjectProperty(path) {
        if (
          path.parentPath.parentPath.isAssignmentExpression() &&
          path.parentPath.parentPath.node?.left?.property?.name ===
            'propTypes' &&
          path.node.key
        ) {
          inserDocs(path, path.node.key.name, docs)
        }
      }
    }
  }
}

function inserDocs(path, name, docs) {
  if (typeof docs[name] !== 'undefined') {
    const comment = docs[name]
    path.insertBefore(path.addComment('leading', `*\n * ${comment}\n`))
  }
}

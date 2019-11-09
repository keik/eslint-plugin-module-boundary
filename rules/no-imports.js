const path = require("path");

const containsPath = require('contains-path')
const debug = require("debug")("eslint-plugin-module-boundary:no-imports");
const globAll = require('glob-all')

module.exports = {
  meta: {
    type: "layout",
    schema: [{
      type: 'object',
      properties: {
        'roots': {
          type: 'array'
        }
      }
    }]
  },
  create(context) {
    const filename = path.relative(context.getCwd(), context.getFilename());
    const option = context.options[0]
    const roots = globAll.sync(option.roots)

    debug("create()", filename);
    return {
      ImportDeclaration(node) {
        const importPath = node.source.value
        if (!isValid(roots, filename, importPath))
          context.report(
            node,
            `Import path \`${importPath}\` is over the module boundary.`,
            { filename }
          );
      }
    };
  }
};

function isValid(roots, filename, importPath) {
  debug(`isValid(${JSON.stringify(roots)}, ${JSON.stringify(filename)}, ${JSON.stringify(importPath)})`);

  const root = roots.find(root => containsPath(filename, root))
  if (root == null) return true

  const importPathFromCwd = path.join(path.dirname(filename), importPath)
  return containsPath(importPathFromCwd, root)
}

module.exports.isValid = isValid

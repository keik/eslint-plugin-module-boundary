const { RuleTester } = require("eslint");

const { test } = require("./test-utils");

const rule = require("./no-imports");
const ruleTester = new RuleTester();

ruleTester.run("no-imports", rule, {
  valid: [
    test({
      code: "import 'fs'",
      filename: "module1/index.js",
      options: [
        {
          roots: []
        }
      ]
    }),
    test({
      code: "import '../module2'",
      filename: "module1/index.js",
      options: [
        {
          roots: []
        }
      ]
    }),
    test({
      code: "import './a'",
      filename: "module1/index.js",
      options: [
        {
          roots: ["module1"]
        }
      ]
    }),
    test({
      code: "import 'module'",
      filename: "module1/index.js",
      options: [
        {
          roots: ["module1"]
        }
      ]
    })
  ],
  invalid: [
    test({
      code: "import '../module2'",
      filename: "module1/index.js",
      options: [
        {
          roots: ["module1"]
        }
      ],
      errors: [
        {
          message: "Import path `../module2` is over the module boundary."
        }
      ]
    })
  ]
});

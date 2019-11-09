const { RuleTester } = require("eslint");

const rule = require("./no-imports");
const ruleTester = new RuleTester();

ruleTester.run("no-imports", rule, {
  // TODO:
  valid: [
    {
      code: "",
      filename: "a/b/c.js"
    }
  ],
  invalid: [
    {
      code: "",
      filename: "a/b/c.js",
      errors: []
    }
  ]
});

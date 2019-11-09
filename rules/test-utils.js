module.exports.test = t =>
  Object.assign(t, {
    parserOptions: {
      ecmaVersion: 6,
      sourceType: "module"
    }
  });

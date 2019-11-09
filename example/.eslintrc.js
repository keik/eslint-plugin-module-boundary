module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module"
  },
  plugins: ["module-boundary"],
  rules: {
    "module-boundary/no-imports": [
      "error",
      {
        roots: [
          // assuming under `src` is separated directories by dependent module
          "./src/*",
          // but `app` is user of modules so excluding module boundary
          "!./src/app"
        ]
      }
    ]
  }
};

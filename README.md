# eslint-plugin-module-boundary

[![npm-version](https://img.shields.io/npm/v/eslint-plugin-module-boundary.svg?style=flat-square)](https://npmjs.org/package/eslint-plugin-module-boundary)

ESLint rules to define module boundary.

## Why

We can manage multiple packages in one repository using [lerna](https://github.com/lerna/lerna) or [Yarn Workspaces](https://yarnpkg.com/en/docs/workspaces) but it is yet possible to refer each other packages using relative path.

This rule defines the module boundary that forbid to refer packages between module boundary.

## Installation

```
npm install eslint-plugin-module-boundary --save-devv
```

.eslintrc:

```js
plugins: ["module-boundary"],
rules: {
  "module-boundary/no-imports": ["error", { /* ... */ }
  // etc...
}
```


## Example

Working example is in [example](./example).
Checkout and execute `npm install && npm run lint`.

## Rules

### `no-imports`

This rule defines the module boundary that forbid to refer packages between module boundary.

Given the following directory structure:

```
src
├── app
│   └── index.js
├── module1
│   ├── index.js
│   └── innerModule1.js
└── module2
    ├── index.js
    └── module2inner.js
```

`module1` and `module2` are independent modules. Should not depend on each other.

Set options to `{ roots: ['src/module1', 'src/module2'] }` as *module boundary* and following pattern are considered problem:

```js
// module1/index.js

import '../module2'; // error Import path `../module1` is over the module boundary
```

`roots` value is available [glob-all](https://github.com/jpillora/node-glob-all#api) pattern:

```js
{
  roots: [
    // assuming under `src` is separated directories by dependent module
    "./src/*",
    // but `app` is user of modules so excluding module boundary
    "!./src/app"
  ]
}
```

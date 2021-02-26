# yup-phone-lite

[![MIT License](https://badgen.net/github/license/csandman/yup-phone-lite "MIT License")](LICENSE) [![npm - yup-phone-lite](https://img.shields.io/npm/v/yup-phone-lite)](https://www.npmjs.com/package/yup-phone-lite "yup-phone-lite npm") [![bundle size - yup-phone-lite](https://badgen.net/bundlephobia/min/yup-phone-lite)](https://bundlephobia.com/result?p=yup-phone-lite) [![bundle size - yup-phone-lite](https://badgen.net/bundlephobia/minzip/yup-phone-lite)](https://bundlephobia.com/result?p=yup-phone-lite)

> Adds a phone number validation check to yup validator using [**libphonenumber-js**](https://www.npmjs.com/package/libphonenumber-js) which gives accurate validation checks.  
> _Read more about the core library here_ [_libphonenumber_](https://github.com/googlei18n/libphonenumber/blob/master/README.md#readme).

## Install

```sh
npm install --save yup-phone-lite
# yarn add yup-phone-lite
```

## Examples

```js
import * as Yup from "yup";
// const Yup = require("yup");
import "yup-phone-lite";
// require("yup-phone-lite");

// validate any phone number (defaults to The United States for country)
const phoneSchema = Yup.string().phone().required();

(async () => {
  console.log(await phoneSchema.isValid("9876543210")); // → true
})();
```

---

```js
// See https://repl.it/repls/SwiftImpossibleCertification
import * as Yup from "yup";
// const Yup = require("yup");
import "yup-phone-lite";
// require("yup-phone-lite");

// validate phone number loosely in the given region
const phoneSchema = Yup.string().phone("IN").required();

(async () => {
  console.log(await phoneSchema.isValid("+919876543210")); // → true
})();
```

---

```js
// See https://repl.it/repls/UniqueForsakenDownloads
import * as Yup from "yup";
// const Yup = require("yup");
import "yup-phone-lite";
// require("yup-phone-lite");

// validate phone number strictly in the given region with custom error message
const phoneSchema = Yup.string()
  .phone("IN", true, "${path} is invalid")
  .required();

try {
  phoneSchema.validateSync("+1 345 9490088");
} catch (error) {
  console.log(error.message); // → this is invalid
}
```

---

For more examples, check [yup-phone-lite.test.ts](src/yup-phone-lite.test.ts) file.

### Module Sizes

```
Destination: dist/yup-phone-lite.umd.js
Bundle Size:  189.22 KB
Minified Size:  103.66 KB
Gzipped Size:  25.5 KB
```

```
Destination: dist/yup-phone-lite.umd.min.js
Bundle Size:  102.71 KB
Minified Size:  101.79 KB
Gzipped Size:  26.04 KB
```

```
Destination: dist/yup-phone-lite.esm.js
Bundle Size:  433 B
Minified Size:  434 B
Gzipped Size:  255 B
```

```
Destination: dist/yup-phone-lite.cjs.js
Bundle Size:  596 B
Minified Size:  597 B
Gzipped Size:  339 B
```

### Contributing

- Uses Rollup for bundling.
- Files are minified using closure compiler.
- Uses jest for testing.
- Generates CJS, UMD, and ESM builds.
- Use `npm version --major|--minor|--patch` to version.
- Use tslint and prettier for code formatting.
- Uses semantic release for version.

```sh
$ npm run build # Build for production
$ npm test # Run tests
$ npm publish # Publish npm package (prompts for version)
```

## License

[MIT](LICENSE).

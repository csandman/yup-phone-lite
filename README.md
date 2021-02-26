# yup-phone-lite

[![MIT License](https://badgen.net/github/license/csandman/yup-phone-lite "MIT License")](LICENSE) [![npm - yup-phone-lite](https://img.shields.io/npm/v/yup-phone-lite)](https://www.npmjs.com/package/yup-phone-lite "yup-phone-lite npm") [![bundle size - yup-phone-lite](https://badgen.net/bundlephobia/min/yup-phone-lite)](https://bundlephobia.com/result?p=yup-phone-lite) [![bundle size - yup-phone-lite](https://badgen.net/bundlephobia/minzip/yup-phone-lite)](https://bundlephobia.com/result?p=yup-phone-lite)

> Adds a phone number validation check to yup validator using [**libphonenumber-js**](https://www.npmjs.com/package/libphonenumber-js) which gives accurate validation checks.  
> _Read more about the core library here_ [_libphonenumber_](https://github.com/googlei18n/libphonenumber/blob/master/README.md#readme).

This package is a fork of [yup-phone](https://github.com/abhisekp/yup-phone) made by [abhisekp](https://github.com/abhisekp). It replaces [**google-libphonenumber**](https://www.npmjs.com/package/google-libphonenumber) with the much smaller port [**libphonenumber-js**](https://www.npmjs.com/package/libphonenumber-js) with the intention of drastically reducing the bundle size. The only drawback is that a few phone numbers will slip through the cracks and give false positives. If that is an issue for you, go ahead and use the original library!

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

[MIT](LICENSE)

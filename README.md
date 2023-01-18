# yup-phone-lite

[![MIT License](https://badgen.net/github/license/csandman/yup-phone-lite "MIT License")](LICENSE)
[![npm - yup-phone-lite](https://img.shields.io/npm/v/yup-phone-lite "yup-phone-lite npm")](https://www.npmjs.com/package/yup-phone-lite)
[![bundle size - yup-phone-lite](https://badgen.net/bundlephobia/min/yup-phone-lite "yup-phone-lite bundlephobia")](https://bundlephobia.com/result?p=yup-phone-lite)
[![bundle size - yup-phone-lite](https://badgen.net/bundlephobia/minzip/yup-phone-lite "yup-phone-lite bundlephobia")](https://bundlephobia.com/result?p=yup-phone-lite)
[![Total Downloads - yup-phone-lite](https://badgen.net/npm/dt/yup-phone-lite?color=blue "yup-phone-lite npm downloads")](https://bundlephobia.com/result?p=yup-phone-lite)

> Adds a phone number validation check to yup validator using [**libphonenumber-js**](https://www.npmjs.com/package/libphonenumber-js) which gives accurate validation checks.  
> _Read more about the core library here_ [_libphonenumber_](https://github.com/googlei18n/libphonenumber/blob/master/README.md#readme).

This package is a fork of [yup-phone](https://github.com/abhisekp/yup-phone) made by [abhisekp](https://github.com/abhisekp). It replaces [**google-libphonenumber**](https://www.npmjs.com/package/google-libphonenumber) with the much smaller port [**libphonenumber-js**](https://www.npmjs.com/package/libphonenumber-js) with the intention of drastically reducing the bundle size.

One difference between this and the original package is that there is no `strict` option for checking a phone number's country, it will always validate against the country code you pass in (or `US` by default). This is because there is no "lenient" option for `libphonenumber-js` like there is with `google-libphonenumber`. The only other difference is that a few phone numbers will slip through the cracks and give false positives (at least according to the tests written for the original package). If either of those is an issue for you, go ahead and use the original package!

[![yup-phone minzipped size](https://badgen.net/bundlephobia/minzip/yup-phone?label=yup-phone "yup-phone bundlephobia")](https://bundlephobia.com/result?p=yup-phone)
[![yup-phone-lite minzipped size](https://badgen.net/bundlephobia/minzip/yup-phone-lite?label=yup-phone-lite "yup-phone-lite bundlephobia")](https://bundlephobia.com/result?p=yup-phone-lite)

## Install

```sh
npm install --save yup-phone-lite
# or
yarn add yup-phone-lite
```

## Usage

Import the package along with Yup:

```js
import * as Yup from "yup";
// const Yup = require("yup");
import "yup-phone-lite";
// require("yup-phone-lite");
```

Then create a schema like you normally would with `yup` except using the `.phone()` function:

```js
Yup.string()
  .phone("US", "Please enter a valid phone number")
  .required("A phone number is required");
```

### API

```js
.phone(countryCode, errorMessage)
```

#### `countryCode`

Type: `CountryCode | CountryCode[]` — Default: `"US"`

You can pass either a single country code string, or an array of country codes. This field mirrors the [country code argument for libphonenumber-js](https://github.com/catamphetamine/libphonenumber-js#country-code). Here is their definition of a country code:

> A "country code" is a [two-letter ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) (like `US`).
>
> This library supports all [officially assigned](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements) ISO alpha-2 country codes, plus a few extra ones like: `AC` ([Ascension Island](https://en.wikipedia.org/wiki/Ascension_Island)), `TA` ([Tristan da Cunha](https://en.wikipedia.org/wiki/Tristan_da_Cunha)), `XK` ([Kosovo](https://en.wikipedia.org/wiki/Kosovo)).

#### `errorMessage`

Type: `string` — Default: `"${path} must be a valid phone number for region ${countryCode}"`

This field is the error message returned by `yup` when the validation fails. Here is [the yup documentation explaining it](https://github.com/jquense/yup#mixedtestname-string-message-string--function-test-function-schema):

> For the `message` argument you can provide a string which will interpolate certain values if specified using the `${param}` syntax. By default all test messages are passed a `path` value which is valuable in nested schemas.

In order to use the params provided by yup, you must pass the `errorMessage` in a normal string made with either `'`, or `"` characters. If you try and form your string with a tick (\`) character, you'll get an error because of the variable not being defined.

Here are the yup params you can use in your string:

- `path`: the string path of the current validation (in a basic validation it will be the string `"this"`, in an object validation, it will be the name of the object key)
- `originalValue`: the original value that is being tested

**NOTE:** While the default error message includes the `countryCode` in it's template string, you can not pass it in the same way you include the `yup` interpolated values, you will have to include the code in the message itself.

```js
// e.g.
.phone("US", "${path} must be a valid phone number for region US");
```

## Examples

```js
import * as Yup from "yup";
// const Yup = require("yup");
import "yup-phone-lite";
// require("yup-phone-lite");

// validate any phone number (defaults to "US" for country)
const phoneSchema = Yup.string().phone().required();

phoneSchema.isValid("(541) 754-3010").then(console.log); // → true
```

---

```js
import * as Yup from "yup";
// const Yup = require("yup");
import "yup-phone-lite";
// require("yup-phone-lite");

// validate phone number for a country other than the US
const phoneSchema = Yup.string().phone("IN").required();

phoneSchema.isValid("+919876543210").then(console.log); // → true
```

---

```js
import * as Yup from "yup";
// const Yup = require("yup");
import "yup-phone-lite";
// require("yup-phone-lite");

// validate phone number in the given region with custom error message
// NOTE: in order to pass a custom error message you must include the country code as the first argument, even if using the default "US"
const phoneSchema = Yup.string().phone("IN", "${path} is invalid").required();

try {
  phoneSchema.validateSync("+1-541-754-3010");
} catch (error) {
  console.log(error.message); // → this is invalid
}
```

For more examples, check [yup-phone-lite.test.ts](src/yup-phone-lite.test.ts) file.

### Contributing

- Files are minified using closure compiler.
- Uses jest for testing.
- Generates CJS, UMD, and ESM builds.
- Use `npm version major|minor|patch` to version.
- Use eslint and prettier for code formatting.
- Uses semantic release for version.

```sh
$ npm run build # Build for production
$ npm test # Run tests
$ npm publish # Publish npm package (prompts for version)
```

## License

[MIT](LICENSE)

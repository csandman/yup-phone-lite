import * as Yup from "yup";
import { isValidPhoneNumber } from "libphonenumber-js";
import { CountryCode } from "libphonenumber-js/types";

declare module "yup" {
  export interface StringSchema {
    /**
     * Check for phone number validity.
     *
     * @param {String} [countryCode=US] The country code to check against.
     * @param {String} [errorMessage=DEFAULT_MESSAGE] The error message to return if the validation fails.
     */
    phone(countryCode?: CountryCode, errorMessage?: string): StringSchema;
  }
}

const YUP_PHONE_METHOD = "phone";
const CLDR_REGION_CODE_SIZE = 2;

const isValidCountryCode = (countryCode: any): boolean =>
  typeof countryCode === "string" &&
  countryCode.length === CLDR_REGION_CODE_SIZE;

Yup.addMethod(
  Yup.string,
  YUP_PHONE_METHOD,
  function yupPhoneLite(countryCode?: CountryCode, errorMessage: string = "") {
    const errMsg =
      typeof errorMessage === "string" && errorMessage
        ? errorMessage
        : isValidCountryCode(countryCode)
        ? `\${path} must be a valid phone number for region ${countryCode}`
        : "${path} must be a valid phone number.";
    // @ts-ignore
    return this.test(YUP_PHONE_METHOD, errMsg, (value: string) => {
      if (!isValidCountryCode(countryCode)) {
        // if not valid countryCode, then set default country to United States (US)
        countryCode = "US";
      }

      try {
        /* check if the countryCode provided should be used as
          default country code or strictly followed
        */
        return isValidPhoneNumber(value, countryCode);
      } catch {
        return false;
      }
    });
  }
);

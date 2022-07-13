import { isValidPhoneNumber } from "libphonenumber-js";
import * as Yup from "yup";
import type { CountryCode } from "libphonenumber-js/types";

declare module "yup" {
  export interface StringSchema {
    /**
     * Check for phone number validity.
     *
     * @param countryCode - The country code to check against
     * @param errorMessage - The error message to return if validation fails
     */
    phone(countryCode?: CountryCode, errorMessage?: string): StringSchema;
  }
}

const YUP_PHONE_METHOD = "phone";
const CLDR_REGION_CODE_SIZE = 2;

const isValidCountryCode = (countryCode?: string): boolean => {
  const isString = typeof countryCode === "string";
  const isValidCodeLength = countryCode?.length === CLDR_REGION_CODE_SIZE;

  return isString && isValidCodeLength;
};

Yup.addMethod(
  Yup.string,
  YUP_PHONE_METHOD,
  function yupPhoneLite(countryCode?: CountryCode, errorMessage?: string) {
    let realCountryCode = countryCode;

    if (!isValidCountryCode(countryCode)) {
      // if not valid countryCode, then set default country to United States (US)
      realCountryCode = "US";
    }

    const errMsg =
      typeof errorMessage === "string" && errorMessage
        ? errorMessage
        : `\${path} must be a valid phone number for region ${countryCode}`;

    return this.test(YUP_PHONE_METHOD, errMsg, (value?: string) => {
      try {
        if (value === undefined || value === "") {
          return true;
        }

        /* check if the countryCode provided should be used as
          default country code or strictly followed
        */
        const isValid = isValidPhoneNumber(value, realCountryCode);
        return isValid;
      } catch {
        return false;
      }
    });
  }
);

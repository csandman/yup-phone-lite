import {
  parsePhoneNumberWithError,
  isValidNumberForRegion,
} from "libphonenumber-js";
import { addMethod, string } from "yup";
import type { CountryCode } from "libphonenumber-js/types";

declare module "yup" {
  export interface StringSchema {
    /**
     * Check for phone number validity.
     *
     * @param countryCode - The country code to check against (default: `"US"`)
     * @param strict - How strictly should it check.
     * @param errorMessage - The error message to return if validation fails
     */
    phone(
      countryCode?: CountryCode,
      strict?: boolean,
      errorMessage?: string
    ): StringSchema;
  }
}

const YUP_PHONE_METHOD = "phone";

addMethod(
  string,
  YUP_PHONE_METHOD,
  function yupPhone(
    countryCode?: CountryCode,
    strict = false,
    errorMessage = ""
  ) {
    let errMsg = typeof errorMessage === "string" && errorMessage;
    if (!errMsg) {
      if (countryCode) {
        errMsg = `\${path} must be a valid phone number for region ${countryCode}`;
      } else {
        // eslint-disable-next-line no-template-curly-in-string
        errMsg = "${path} must be a valid phone number.";
      }
    }

    return this.test(YUP_PHONE_METHOD, errMsg, (value = "") => {
      try {
        const phoneNumber = parsePhoneNumberWithError(value, countryCode);

        if (!phoneNumber.isPossible()) {
          return false;
        }

        /* check if the countryCode provided should be used as
          default country code or strictly followed
        */
        if (strict && countryCode) {
          return isValidNumberForRegion(value, countryCode);
        }

        return phoneNumber.isValid();
      } catch {
        return false;
      }
    });
  }
);

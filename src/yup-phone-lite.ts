import { isValidPhoneNumber, isSupportedCountry } from "libphonenumber-js";
import * as Yup from "yup";
import type { CountryCode } from "libphonenumber-js/types";

declare module "yup" {
  export interface StringSchema {
    /**
     * Check for phone number validity.
     *
     * @param countryCode - The country code to check against (default: `"US"`)
     * @param errorMessage - The error message to return if validation fails
     */
    phone(
      countryCode?: CountryCode | CountryCode[],
      errorMessage?: string
    ): StringSchema;
  }
}

const YUP_PHONE_METHOD = "phone";

const isValidCountryCode = (countryCode?: string): boolean => {
  if (typeof countryCode !== "string") {
    return false;
  }

  return isSupportedCountry(countryCode);
};

Yup.addMethod(
  Yup.string,
  YUP_PHONE_METHOD,
  function yupPhoneLite(
    countryCode: CountryCode | CountryCode[] = "US",
    errorMessage?: string
  ) {
    const countryCodes: CountryCode[] = [countryCode].flat();

    let validCountryCodes = countryCodes.filter(isValidCountryCode);

    if (!validCountryCodes.length) {
      validCountryCodes = ["US"];
    }

    const errMsg =
      typeof errorMessage === "string" && errorMessage
        ? errorMessage
        : `\${path} must be a valid phone number for region${
            validCountryCodes.length > 1 ? "s" : ""
          } ${validCountryCodes.join(", ")}`;

    return this.test(YUP_PHONE_METHOD, errMsg, (value?: string) => {
      try {
        if (value === undefined || value === "") {
          return true;
        }

        const isValid = validCountryCodes.reduce(
          (isValidAccum, validCountryCode) => {
            const isValidPhone = isValidPhoneNumber(value, validCountryCode);

            return isValidAccum || isValidPhone;
          },
          false
        );
        return isValid;
      } catch {
        return false;
      }
    });
  }
);

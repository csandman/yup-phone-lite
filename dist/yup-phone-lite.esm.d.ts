import { CountryCode } from "libphonenumber-js/types";
declare module "yup" {
    interface StringSchema {
        /**
         * Check for phone number validity.
         *
         * @param {String} [countryCode=US] The country code to check against.
         * @param {String} [errorMessage=DEFAULT_MESSAGE] The error message to return if the validation fails.
         */
        phone(countryCode?: CountryCode, errorMessage?: string): StringSchema;
    }
}

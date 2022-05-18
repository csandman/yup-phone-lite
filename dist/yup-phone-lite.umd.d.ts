import { CountryCode } from 'libphonenumber-js/types';
declare module 'yup' {
    interface StringSchema {
        /**
         * Check for phone number validity.
         *
         * @param {String} [countryCode=US] The country code to check against.
         * @param {String} [errorMessage=DEFAULT_MESSAGE] returns error if failed validation
         */
        phone(countryCode?: CountryCode, errorMessage?: string): StringSchema;
    }
}

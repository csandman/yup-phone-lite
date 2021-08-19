'use strict';var Yup=require("yup"),libphonenumberJs=require("libphonenumber-js"),YUP_PHONE_METHOD="phone",CLDR_REGION_CODE_SIZE=2,isValidCountryCode=function(b){return"string"===typeof b&&b.length===CLDR_REGION_CODE_SIZE};
Yup.addMethod(Yup.string,YUP_PHONE_METHOD,function(b,a){void 0===a&&(a="");isValidCountryCode(b)||(b="US");return this.test(YUP_PHONE_METHOD,"string"===typeof a&&a?a:"${path} must be a valid phone number for region "+b,function(a){try{return void 0===a||""===a?!0:libphonenumberJs.isValidPhoneNumber(a,b)}catch(c){return!1}})})
//# sourceMappingURL=yup-phone-lite.cjs.js.map

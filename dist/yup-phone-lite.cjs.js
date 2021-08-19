'use strict';var Yup=require("yup"),libphonenumberJs=require("libphonenumber-js"),YUP_PHONE_METHOD="phone",CLDR_REGION_CODE_SIZE=2,isValidCountryCode=function(a){return"string"===typeof a&&a.length===CLDR_REGION_CODE_SIZE};
Yup.addMethod(Yup.string,YUP_PHONE_METHOD,function(a,b){void 0===b&&(b="");isValidCountryCode(a)||(a="US");return this.test(YUP_PHONE_METHOD,"string"===typeof b&&b?b:"${path} must be a valid phone number for region "+a,function(b){try{return libphonenumberJs.isValidPhoneNumber(b,a)}catch(c){return!1}})})
//# sourceMappingURL=yup-phone-lite.cjs.js.map

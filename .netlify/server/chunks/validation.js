import * as yup from "yup";
import { b as arrayOfUndefs, c as compactArray } from "./stores.js";
const apiConnectorDictionary = {
  UsStates: [
    "Alabama",
    "Alaska",
    "America Samoa",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Guam",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Palau",
    "Pennsylvania",
    "Puerto Rico",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virgin Island",
    "Virginia",
    "Washington",
    "Washington D.C.",
    "West Virginia",
    "Wisconsin",
    "Wyoming"
  ],
  Countries: ["United States", "Canada", "Mexico"],
  provinces: [
    "Ontario",
    "Quebec",
    "Nova Scotia",
    "New Brunswick",
    "Manitoba",
    "British Columbia",
    "Prince Edward Island",
    "Saskatchewan",
    "Alberta",
    "Newfoundland & Labrador",
    "Northwest Territories",
    "Yukon",
    "Nunavut"
  ],
  mexicanStates: [
    "Aguascalientes",
    "Baja California",
    "Baja California Sur",
    "Campeche",
    "Chiapas",
    "Chihuahua",
    "Coahuila",
    "Colima",
    "Mexico City",
    "Durango",
    "Guanajuato",
    "Guerrero",
    "Hidalgo",
    "Jalisco",
    "México",
    "Michoacán",
    "Morelos",
    "Nayarit",
    "Nuevo León",
    "Oaxaca",
    "Puebla",
    "Querétaro",
    "Quintana Roo",
    "San Luis Potosí",
    "Sinaloa",
    "Sonora",
    "Tabasco",
    "Tamaulipas",
    "Tlaxcala",
    "Veracruz",
    "Yucatán",
    "Zacatecas"
  ]
};
const allCountries = [
  { name: "Afghanistan", code: "AF" },
  { name: "Åland Islands", code: "AX" },
  { name: "Albania", code: "AL" },
  { name: "Algeria", code: "DZ" },
  { name: "American Samoa", code: "AS" },
  { name: "AndorrA", code: "AD" },
  { name: "Angola", code: "AO" },
  { name: "Anguilla", code: "AI" },
  { name: "Antarctica", code: "AQ" },
  { name: "Antigua and Barbuda", code: "AG" },
  { name: "Argentina", code: "AR" },
  { name: "Armenia", code: "AM" },
  { name: "Aruba", code: "AW" },
  { name: "Australia", code: "AU" },
  { name: "Austria", code: "AT" },
  { name: "Azerbaijan", code: "AZ" },
  { name: "Bahamas", code: "BS" },
  { name: "Bahrain", code: "BH" },
  { name: "Bangladesh", code: "BD" },
  { name: "Barbados", code: "BB" },
  { name: "Belarus", code: "BY" },
  { name: "Belgium", code: "BE" },
  { name: "Belize", code: "BZ" },
  { name: "Benin", code: "BJ" },
  { name: "Bermuda", code: "BM" },
  { name: "Bhutan", code: "BT" },
  { name: "Bolivia", code: "BO" },
  { name: "Bosnia and Herzegovina", code: "BA" },
  { name: "Botswana", code: "BW" },
  { name: "Bouvet Island", code: "BV" },
  { name: "Brazil", code: "BR" },
  { name: "British Indian Ocean Territory", code: "IO" },
  { name: "Brunei Darussalam", code: "BN" },
  { name: "Bulgaria", code: "BG" },
  { name: "Burkina Faso", code: "BF" },
  { name: "Burundi", code: "BI" },
  { name: "Cambodia", code: "KH" },
  { name: "Cameroon", code: "CM" },
  { name: "Canada", code: "CA" },
  { name: "Cape Verde", code: "CV" },
  { name: "Cayman Islands", code: "KY" },
  { name: "Central African Republic", code: "CF" },
  { name: "Chad", code: "TD" },
  { name: "Chile", code: "CL" },
  { name: "China", code: "CN" },
  { name: "Christmas Island", code: "CX" },
  { name: "Cocos (Keeling) Islands", code: "CC" },
  { name: "Colombia", code: "CO" },
  { name: "Comoros", code: "KM" },
  { name: "Congo", code: "CG" },
  { name: "Congo, The Democratic Republic of the", code: "CD" },
  { name: "Cook Islands", code: "CK" },
  { name: "Costa Rica", code: "CR" },
  { name: "Cote D'Ivoire", code: "CI" },
  { name: "Croatia", code: "HR" },
  { name: "Cuba", code: "CU" },
  { name: "Cyprus", code: "CY" },
  { name: "Czech Republic", code: "CZ" },
  { name: "Denmark", code: "DK" },
  { name: "Djibouti", code: "DJ" },
  { name: "Dominica", code: "DM" },
  { name: "Dominican Republic", code: "DO" },
  { name: "Ecuador", code: "EC" },
  { name: "Egypt", code: "EG" },
  { name: "El Salvador", code: "SV" },
  { name: "Equatorial Guinea", code: "GQ" },
  { name: "Eritrea", code: "ER" },
  { name: "Estonia", code: "EE" },
  { name: "Ethiopia", code: "ET" },
  { name: "Falkland Islands (Malvinas)", code: "FK" },
  { name: "Faroe Islands", code: "FO" },
  { name: "Fiji", code: "FJ" },
  { name: "Finland", code: "FI" },
  { name: "France", code: "FR" },
  { name: "French Guiana", code: "GF" },
  { name: "French Polynesia", code: "PF" },
  { name: "French Southern Territories", code: "TF" },
  { name: "Gabon", code: "GA" },
  { name: "Gambia", code: "GM" },
  { name: "Georgia", code: "GE" },
  { name: "Germany", code: "DE" },
  { name: "Ghana", code: "GH" },
  { name: "Gibraltar", code: "GI" },
  { name: "Greece", code: "GR" },
  { name: "Greenland", code: "GL" },
  { name: "Grenada", code: "GD" },
  { name: "Guadeloupe", code: "GP" },
  { name: "Guam", code: "GU" },
  { name: "Guatemala", code: "GT" },
  { name: "Guernsey", code: "GG" },
  { name: "Guinea", code: "GN" },
  { name: "Guinea-Bissau", code: "GW" },
  { name: "Guyana", code: "GY" },
  { name: "Haiti", code: "HT" },
  { name: "Heard Island and Mcdonald Islands", code: "HM" },
  { name: "Holy See (Vatican City State)", code: "VA" },
  { name: "Honduras", code: "HN" },
  { name: "Hong Kong", code: "HK" },
  { name: "Hungary", code: "HU" },
  { name: "Iceland", code: "IS" },
  { name: "India", code: "IN" },
  { name: "Indonesia", code: "ID" },
  { name: "Iran, Islamic Republic Of", code: "IR" },
  { name: "Iraq", code: "IQ" },
  { name: "Ireland", code: "IE" },
  { name: "Isle of Man", code: "IM" },
  { name: "Israel", code: "IL" },
  { name: "Italy", code: "IT" },
  { name: "Jamaica", code: "JM" },
  { name: "Japan", code: "JP" },
  { name: "Jersey", code: "JE" },
  { name: "Jordan", code: "JO" },
  { name: "Kazakhstan", code: "KZ" },
  { name: "Kenya", code: "KE" },
  { name: "Kiribati", code: "KI" },
  { name: "Korea, Democratic People'S Republic of", code: "KP" },
  { name: "Korea, Republic of", code: "KR" },
  { name: "Kuwait", code: "KW" },
  { name: "Kyrgyzstan", code: "KG" },
  { name: "Lao People'S Democratic Republic", code: "LA" },
  { name: "Latvia", code: "LV" },
  { name: "Lebanon", code: "LB" },
  { name: "Lesotho", code: "LS" },
  { name: "Liberia", code: "LR" },
  { name: "Libyan Arab Jamahiriya", code: "LY" },
  { name: "Liechtenstein", code: "LI" },
  { name: "Lithuania", code: "LT" },
  { name: "Luxembourg", code: "LU" },
  { name: "Macao", code: "MO" },
  { name: "Macedonia, The Former Yugoslav Republic of", code: "MK" },
  { name: "Madagascar", code: "MG" },
  { name: "Malawi", code: "MW" },
  { name: "Malaysia", code: "MY" },
  { name: "Maldives", code: "MV" },
  { name: "Mali", code: "ML" },
  { name: "Malta", code: "MT" },
  { name: "Marshall Islands", code: "MH" },
  { name: "Martinique", code: "MQ" },
  { name: "Mauritania", code: "MR" },
  { name: "Mauritius", code: "MU" },
  { name: "Mayotte", code: "YT" },
  { name: "Mexico", code: "MX" },
  { name: "Micronesia, Federated States of", code: "FM" },
  { name: "Moldova, Republic of", code: "MD" },
  { name: "Monaco", code: "MC" },
  { name: "Mongolia", code: "MN" },
  { name: "Montserrat", code: "MS" },
  { name: "Morocco", code: "MA" },
  { name: "Mozambique", code: "MZ" },
  { name: "Myanmar", code: "MM" },
  { name: "Namibia", code: "NA" },
  { name: "Nauru", code: "NR" },
  { name: "Nepal", code: "NP" },
  { name: "Netherlands", code: "NL" },
  { name: "Netherlands Antilles", code: "AN" },
  { name: "New Caledonia", code: "NC" },
  { name: "New Zealand", code: "NZ" },
  { name: "Nicaragua", code: "NI" },
  { name: "Niger", code: "NE" },
  { name: "Nigeria", code: "NG" },
  { name: "Niue", code: "NU" },
  { name: "Norfolk Island", code: "NF" },
  { name: "Northern Mariana Islands", code: "MP" },
  { name: "Norway", code: "NO" },
  { name: "Oman", code: "OM" },
  { name: "Pakistan", code: "PK" },
  { name: "Palau", code: "PW" },
  { name: "Palestinian Territory, Occupied", code: "PS" },
  { name: "Panama", code: "PA" },
  { name: "Papua New Guinea", code: "PG" },
  { name: "Paraguay", code: "PY" },
  { name: "Peru", code: "PE" },
  { name: "Philippines", code: "PH" },
  { name: "Pitcairn", code: "PN" },
  { name: "Poland", code: "PL" },
  { name: "Portugal", code: "PT" },
  { name: "Puerto Rico", code: "PR" },
  { name: "Qatar", code: "QA" },
  { name: "Reunion", code: "RE" },
  { name: "Romania", code: "RO" },
  { name: "Russian Federation", code: "RU" },
  { name: "RWANDA", code: "RW" },
  { name: "Saint Helena", code: "SH" },
  { name: "Saint Kitts and Nevis", code: "KN" },
  { name: "Saint Lucia", code: "LC" },
  { name: "Saint Pierre and Miquelon", code: "PM" },
  { name: "Saint Vincent and the Grenadines", code: "VC" },
  { name: "Samoa", code: "WS" },
  { name: "San Marino", code: "SM" },
  { name: "Sao Tome and Principe", code: "ST" },
  { name: "Saudi Arabia", code: "SA" },
  { name: "Senegal", code: "SN" },
  { name: "Serbia and Montenegro", code: "CS" },
  { name: "Seychelles", code: "SC" },
  { name: "Sierra Leone", code: "SL" },
  { name: "Singapore", code: "SG" },
  { name: "Slovakia", code: "SK" },
  { name: "Slovenia", code: "SI" },
  { name: "Solomon Islands", code: "SB" },
  { name: "Somalia", code: "SO" },
  { name: "South Africa", code: "ZA" },
  { name: "South Georgia and the South Sandwich Islands", code: "GS" },
  { name: "Spain", code: "ES" },
  { name: "Sri Lanka", code: "LK" },
  { name: "Sudan", code: "SD" },
  { name: "Suriname", code: "SR" },
  { name: "Svalbard and Jan Mayen", code: "SJ" },
  { name: "Swaziland", code: "SZ" },
  { name: "Sweden", code: "SE" },
  { name: "Switzerland", code: "CH" },
  { name: "Syrian Arab Republic", code: "SY" },
  { name: "Taiwan, Province of China", code: "TW" },
  { name: "Tajikistan", code: "TJ" },
  { name: "Tanzania, United Republic of", code: "TZ" },
  { name: "Thailand", code: "TH" },
  { name: "Timor-Leste", code: "TL" },
  { name: "Togo", code: "TG" },
  { name: "Tokelau", code: "TK" },
  { name: "Tonga", code: "TO" },
  { name: "Trinidad and Tobago", code: "TT" },
  { name: "Tunisia", code: "TN" },
  { name: "Turkey", code: "TR" },
  { name: "Turkmenistan", code: "TM" },
  { name: "Turks and Caicos Islands", code: "TC" },
  { name: "Tuvalu", code: "TV" },
  { name: "Uganda", code: "UG" },
  { name: "Ukraine", code: "UA" },
  { name: "United Arab Emirates", code: "AE" },
  { name: "United Kingdom", code: "GB" },
  { name: "United States", code: "US" },
  { name: "United States Minor Outlying Islands", code: "UM" },
  { name: "Uruguay", code: "UY" },
  { name: "Uzbekistan", code: "UZ" },
  { name: "Vanuatu", code: "VU" },
  { name: "Venezuela", code: "VE" },
  { name: "Viet Nam", code: "VN" },
  { name: "Virgin Islands, British", code: "VG" },
  { name: "Virgin Islands, U.S.", code: "VI" },
  { name: "Wallis and Futuna", code: "WF" },
  { name: "Western Sahara", code: "EH" },
  { name: "Yemen", code: "YE" },
  { name: "Zambia", code: "ZM" },
  { name: "Zimbabwe", code: "ZW" }
];
function displayDateNumerical(date) {
  const month = new Date(date).getMonth() + 1 < 10 ? "0" + (new Date(date).getMonth() + 1).toString() : new Date(date).getMonth() + 1;
  const day = new Date(date).getDate() < 10 ? "0" + new Date(date).getDate().toString() : new Date(date).getDate();
  return month + "/" + day + "/" + new Date(date).getFullYear();
}
function displayTime(date) {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const formattedDateString = date.toLocaleString("en-US", {
    timeZone: timezone
  });
  const twentyFourHours = new Date(formattedDateString).getHours();
  const actualMinutes = new Date(formattedDateString).getMinutes();
  const hours = twentyFourHours > 12 ? (twentyFourHours - 12).toString() : twentyFourHours.toString();
  const minutes = actualMinutes < 10 ? "0" + actualMinutes.toString() : actualMinutes.toString();
  const amPm = twentyFourHours > 12 ? "p.m." : "a.m.";
  return hours + ":" + minutes + " " + amPm;
}
function dateToServerString(date) {
  console.log(date);
  const splitTerm = date.split("-");
  const year = splitTerm[0], month = splitTerm[1], day = splitTerm[2];
  return month + "/" + day + "/" + year;
}
yup.setLocale({
  mixed: {
    required: "Please fill out this field",
    oneOf: "Please pick one of the allowed options",
    notType: "Please fill out this field"
  },
  number: {
    positive: "Must be a positive number",
    integer: "Please enter 0 for no quantity"
  },
  string: {
    email: "Please enter a valid email address"
  }
});
yup.addMethod(yup.string, "creditCard", function() {
  return this.test(`creditCard`, function(value) {
    const { path, createError } = this;
    return value && value.length >= 13 || createError({ path, message: "Please enter a valid credit card number" });
  });
});
yup.addMethod(yup.string, "ccCode", function() {
  return this.test(`ccCode`, function(value) {
    const { path, createError } = this;
    return value && value.length >= 3 && value.length <= 4 || createError({ path, message: "Must be between 3 and 4 digits" });
  });
});
yup.addMethod(yup.string, "price", function() {
  return this.test(`price`, function(value) {
    const { path, createError } = this;
    const regex = /\d{1,3}(?:[,]\d{3})*(?:[.]\d{2})/;
    return !value || !!value.match(regex) && +value >= 0 || createError({ path, message: "Please enter a price or 0.00 if no price" });
  });
});
yup.addMethod(yup.string, "password", function() {
  return this.test(`password`, function(value) {
    const { path, createError } = this;
    return !value || value?.length >= 5 || createError({ path, message: "Password must be greater than 5 characters" });
  });
});
yup.addMethod(yup.string, "confirmPassword", function() {
  return this.test(`confirmPassword`, function(value) {
    const { path, createError, parent } = this;
    return !value || value === parent.password || createError({ path, message: "Passwords do not match" });
  });
});
yup.addMethod(yup.string, "zip", function(errorMessage) {
  return this.test(`zip`, errorMessage, function(value) {
    let country = "United States";
    const { path, createError } = this;
    if (path.includes("mailing")) {
      country = this.parent.mailingCountry;
    } else if (path.includes("home")) {
      country = this.parent.homeCountry;
    } else {
      country = this.parent.country;
    }
    const regex = /(^\d{5}(-\d{4})?$)|(^[ABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Z]{1}[ -]*\d{1}[A-Z]{1}\d{1}$)/;
    if (value?.length == 0 || value == void 0) {
      return true;
    } else
      return value && !!value.match(regex) || createError({ path, message: country === "United States" ? "Please enter a valid zip code" : "Please enter a valid postal code" });
  });
});
yup.addMethod(yup.string, "phone", function(errorMessage) {
  return this.test(`phone`, errorMessage, function(value) {
    const { path, createError } = this;
    const cleaned = ("" + value).replace(/\D/g, ""), regex1 = /^\d{10}(ext\d{1,5})$/i, regex2 = /^\d{10}([Xx]\d+)?$/, regex3 = /^1\d{10}(ext\d{1,4})$/i, regex4 = /^1\d{10}([Xx]\d+)?$/, regex5 = /^\+\d{6,15}$/;
    if (value?.length == 0 || value == void 0) {
      return true;
    } else if (cleaned && (!!cleaned.match(regex1) || !!cleaned.match(regex2) || !!cleaned.match(regex3) || !!cleaned.match(regex4) || !!cleaned.match(regex5))) {
      return true;
    } else {
      return createError({ path, message: "Please enter a valid phone number" });
    }
  });
});
yup.addMethod(yup.string, "category", function(categories, errorMessage) {
  return this.test(`category`, errorMessage, function(value) {
    const { path, createError } = this;
    if (!value) {
      return true;
    }
    if (value && categories.find((cat) => cat == value) != void 0) {
      return true;
    } else {
      return createError({ path, message: "Please choose an existing category from the list" });
    }
  });
});
yup.addMethod(yup.number, "quantityCheck", function(checkAmount, errorMessage) {
  return this.test(`quantityCheck`, errorMessage, function(value) {
    const numbersArray = arrayOfUndefs(checkAmount).map((_unused, index) => index + 1);
    const { path, createError } = this;
    if (!value) {
      return true;
    }
    if (value && numbersArray.find((cat) => cat === value) != void 0) {
      return true;
    } else {
      return createError({ path, message: "For greater accommodation, contact your broker" });
    }
  });
});
yup.addMethod(yup.number, "greaterThan", function(errorMessage) {
  return this.test(`greaterThan`, errorMessage, function(value) {
    const { path, createError, parent } = this;
    const checkAmount = parent.rateMin;
    if (value && value >= checkAmount) {
      return true;
    } else {
      return createError({
        path,
        message: "Please choose a value greater than or equal to the Rate Minimum"
      });
    }
  });
});
yup.addMethod(yup.string, "greaterThan", function(errorMessage) {
  return this.test(`greaterThan`, errorMessage, function(value) {
    const { path, createError, parent } = this;
    const checkAmount = parent.rateMin;
    if (value && value >= checkAmount) {
      return true;
    } else {
      return createError({
        path,
        message: "Please choose a value greater than or equal to the Rate Minimum"
      });
    }
  });
});
yup.addMethod(yup.string, "state", function(errorMessage) {
  return this.test(`state`, errorMessage, function(value) {
    let country = "United States";
    const { path, createError } = this;
    if (path.includes("mailing")) {
      country = this.parent.mailingCountry;
    } else if (path.includes("home")) {
      country = this.parent.homeCountry;
    } else {
      country = this.parent.country;
    }
    const validValues = country === "United States" ? apiConnectorDictionary.UsStates : country === "Canada" ? apiConnectorDictionary.provinces : [];
    return country !== "United States" || !value || validValues.includes(value) || createError({
      path,
      message: country === "United States" ? "Please choose a State from the list" : "Please choose a Province from the list"
    });
  });
});
yup.addMethod(yup.string, "country", function(errorMessage) {
  return this.test(`country`, errorMessage, function(value) {
    const { path, createError } = this;
    const validValues = compactArray(
      allCountries.map(
        (country) => country.name !== "United States Minor Outlying Islands" ? country.name : void 0
      )
    );
    return !value || validValues.includes(value) || createError({ path, message: "Please choose the country from the list" });
  });
});
yup.addMethod(yup.string, "website", function(errorMessage) {
  return this.test(`website`, errorMessage, function(value) {
    const { path, createError } = this;
    const regex = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
    const matchFound = value?.match(regex);
    if (!value) {
      return true;
    } else if (matchFound) {
      return true;
    } else {
      return createError({ path, message: "Please enter a valid URL" });
    }
  });
});
yup.addMethod(yup.string, "verifyCheckoutDate", function(errorMessage) {
  return this.test(`verifyCheckoutDate`, errorMessage, function(value) {
    const { path, createError, parent } = this;
    const checkIn = parent.checkIn;
    if (!parent.checkIn) {
      return true;
    }
    if (value && new Date(checkIn) < new Date(value)) {
      return true;
    } else {
      return createError({
        path,
        message: "Please enter a date later than " + dateToServerString(parent.checkIn)
      });
    }
  });
});
yup.addMethod(yup.string, "verifyCheckInDate", function(errorMessage) {
  return this.test(`verifyCheckInDate`, errorMessage, function(value) {
    const { path, createError } = this;
    if (value && /* @__PURE__ */ new Date() < new Date(value)) {
      return true;
    } else {
      return createError({
        path,
        message: "Please enter a future date"
      });
    }
  });
});
yup.addMethod(yup.string, "valueNotUsed", function(values, errorMessage) {
  return this.test(`valueNotUsed`, errorMessage, function(value) {
    const { path, createError } = this;
    if (!value) {
      return true;
    }
    if (value && values.find((x) => x == value) != void 0) {
      return createError({ path, message: "Your username has already been taken." });
    } else {
      return true;
    }
  });
});
yup.addMethod(yup.string, "xDigitsOnly", function(maxLength, errorMessage) {
  return this.test(`xDigitsOnly`, errorMessage, function(value) {
    const { path, createError } = this;
    if (!value) {
      return true;
    }
    if (value && value.length != maxLength) {
      return createError({ path, message: "This must be three digits exactly." });
    } else {
      return true;
    }
  });
});
export {
  displayTime as a,
  displayDateNumerical as d
};

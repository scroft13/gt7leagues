import * as yup from 'yup';
import { dateToServerString } from '$lib/formatters';
import { arrayOfUndefs, compactArray } from '$lib/utils';
import { allCountries, apiConnectorDictionary } from '$lib/consts';

yup.setLocale({
  mixed: {
    required: 'Please fill out this field',
    oneOf: 'Please pick one of the allowed options',
    notType: 'Please fill out this field',
  },
  number: {
    positive: 'Must be a positive number',
    integer: 'Please enter 0 for no quantity',
  },
  string: {
    email: 'Please enter a valid email address',
  },
});

yup.addMethod(yup.string, 'creditCard', function () {
  return this.test(`creditCard`, function (value) {
    const { path, createError } = this;
    return (
      (value && value.length >= 13) ||
      createError({ path, message: 'Please enter a valid credit card number' })
    );
  });
});
yup.addMethod(yup.string, 'ccCode', function () {
  return this.test(`ccCode`, function (value) {
    const { path, createError } = this;
    return (
      (value && value.length >= 3 && value.length <= 4) ||
      createError({ path, message: 'Must be between 3 and 4 digits' })
    );
  });
});
yup.addMethod(yup.string, 'price', function () {
  return this.test(`price`, function (value) {
    const { path, createError } = this;
    const regex = /\d{1,3}(?:[,]\d{3})*(?:[.]\d{2})/;
    return (
      !value ||
      (!!value.match(regex) && +value >= 0) ||
      createError({ path, message: 'Please enter a price or 0.00 if no price' })
    );
  });
});

yup.addMethod(yup.string, 'password', function () {
  return this.test(`password`, function (value) {
    const { path, createError } = this;
    return (
      !value ||
      value?.length >= 5 ||
      createError({ path, message: 'Password must be greater than 5 characters' })
    );
  });
});

yup.addMethod(yup.string, 'confirmPassword', function () {
  return this.test(`confirmPassword`, function (value) {
    const { path, createError, parent } = this;
    return (
      !value ||
      value === parent.password ||
      createError({ path, message: 'Passwords do not match' })
    );
  });
});

yup.addMethod(yup.string, 'zip', function (errorMessage) {
  return this.test(`zip`, errorMessage, function (value) {
    let country = 'United States';
    const { path, createError } = this;
    if (path.includes('mailing')) {
      country = this.parent.mailingCountry;
    } else if (path.includes('home')) {
      country = this.parent.homeCountry;
    } else {
      country = this.parent.country;
    }
    const regex =
      /(^\d{5}(-\d{4})?$)|(^[ABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Z]{1}[ -]*\d{1}[A-Z]{1}\d{1}$)/;
    if (value?.length == 0 || value == undefined) {
      return true;
    } else return (value && !!value.match(regex)) || createError({ path, message: country === 'United States' ? 'Please enter a valid zip code' : 'Please enter a valid postal code' });
  });
});

yup.addMethod(yup.string, 'phone', function (errorMessage) {
  return this.test(`phone`, errorMessage, function (value) {
    const { path, createError } = this;
    const cleaned = ('' + value).replace(/\D/g, ''),
      regex1 = /^\d{10}(ext\d{1,5})$/i,
      regex2 = /^\d{10}([Xx]\d+)?$/,
      regex3 = /^1\d{10}(ext\d{1,4})$/i,
      regex4 = /^1\d{10}([Xx]\d+)?$/,
      regex5 = /^\+\d{6,15}$/;
    if (value?.length == 0 || value == undefined) {
      return true;
    } else if (
      cleaned &&
      (!!cleaned.match(regex1) ||
        !!cleaned.match(regex2) ||
        !!cleaned.match(regex3) ||
        !!cleaned.match(regex4) ||
        !!cleaned.match(regex5))
    ) {
      return true;
    } else {
      return createError({ path, message: 'Please enter a valid phone number' });
    }
  });
});
yup.addMethod(yup.string, 'category', function (categories, errorMessage) {
  return this.test(`category`, errorMessage, function (value) {
    const { path, createError } = this;
    if (!value) {
      return true;
    }
    if (value && categories.find((cat: string) => cat == value) != undefined) {
      return true;
    } else {
      return createError({ path, message: 'Please choose an existing category from the list' });
    }
  });
});
yup.addMethod(yup.number, 'quantityCheck', function (checkAmount: number, errorMessage) {
  return this.test(`quantityCheck`, errorMessage, function (value) {
    const numbersArray = arrayOfUndefs(checkAmount).map((_unused, index) => index + 1);
    const { path, createError } = this;
    if (!value) {
      return true;
    }
    if (value && numbersArray.find((cat) => cat === value) != undefined) {
      return true;
    } else {
      return createError({ path, message: 'For greater accommodation, contact your broker' });
    }
  });
});
yup.addMethod(yup.number, 'greaterThan', function (errorMessage) {
  return this.test(`greaterThan`, errorMessage, function (value) {
    const { path, createError, parent } = this;
    const checkAmount = parent.rateMin;
    if (value && value >= checkAmount) {
      return true;
    } else {
      return createError({
        path,
        message: 'Please choose a value greater than or equal to the Rate Minimum',
      });
    }
  });
});
yup.addMethod(yup.string, 'greaterThan', function (errorMessage) {
  return this.test(`greaterThan`, errorMessage, function (value) {
    const { path, createError, parent } = this;
    const checkAmount = parent.rateMin;
    if (value && value >= checkAmount) {
      return true;
    } else {
      return createError({
        path,
        message: 'Please choose a value greater than or equal to the Rate Minimum',
      });
    }
  });
});
yup.addMethod(yup.string, 'state', function (errorMessage) {
  return this.test(`state`, errorMessage, function (value) {
    let country = 'United States';
    const { path, createError } = this;
    if (path.includes('mailing')) {
      country = this.parent.mailingCountry;
    } else if (path.includes('home')) {
      country = this.parent.homeCountry;
    } else {
      country = this.parent.country;
    }
    const validValues =
      country === 'United States'
        ? apiConnectorDictionary.UsStates
        : country === 'Canada'
        ? apiConnectorDictionary.provinces
        : [];
    return (
      country !== 'United States' ||
      !value ||
      validValues.includes(value) ||
      createError({
        path,
        message:
          country === 'United States'
            ? 'Please choose a State from the list'
            : 'Please choose a Province from the list',
      })
    );
  });
});
yup.addMethod(yup.string, 'country', function (errorMessage) {
  return this.test(`country`, errorMessage, function (value) {
    const { path, createError } = this;
    const validValues = compactArray(
      allCountries.map((country) =>
        country.name !== 'United States Minor Outlying Islands' ? country.name : undefined,
      ),
    );
    return (
      !value ||
      validValues.includes(value) ||
      createError({ path, message: 'Please choose the country from the list' })
    );
  });
});
yup.addMethod(yup.string, 'website', function (errorMessage) {
  return this.test(`website`, errorMessage, function (value) {
    const { path, createError } = this;
    const regex =
      /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
    const matchFound = value?.match(regex);
    if (!value) {
      return true;
    } else if (matchFound) {
      return true;
    } else {
      return createError({ path, message: 'Please enter a valid URL' });
    }
  });
});
yup.addMethod(yup.string, 'verifyCheckoutDate', function (errorMessage) {
  return this.test(`verifyCheckoutDate`, errorMessage, function (value) {
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
        message: 'Please enter a date later than ' + dateToServerString(parent.checkIn),
      });
    }
  });
});
yup.addMethod(yup.string, 'verifyCheckInDate', function (errorMessage) {
  return this.test(`verifyCheckInDate`, errorMessage, function (value) {
    const { path, createError } = this;

    if (value && new Date() < new Date(value)) {
      return true;
    } else {
      return createError({
        path,
        message: 'Please enter a future date',
      });
    }
  });
});

export default yup;

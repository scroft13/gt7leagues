import { allCountries, canadianProvincesAndAbbreviations, usStateAndAbbreviation } from './consts';

export const monthsArray = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export function centsToAmount(cents: number): string {
  return (cents / 100)
    .toLocaleString('en-US', { style: 'currency', currency: 'USD' })
    .replace(/\.00$/, '');
}

export function displayDate(date: Date): string {
  return (
    new Date(date).getDate() +
    ' ' +
    monthsArray[new Date(date).getMonth()] +
    ', ' +
    new Date(date).getFullYear()
  );
}
export function displayDateNumerical(date: Date): string {
  const month =
    new Date(date).getMonth() + 1 < 10
      ? '0' + (new Date(date).getMonth() + 1).toString()
      : new Date(date).getMonth() + 1;
  const day =
    new Date(date).getDate() < 10
      ? '0' + new Date(date).getDate().toString()
      : new Date(date).getDate();
  return month + '/' + day + '/' + new Date(date).getFullYear();
}

export function addZeroToDay(day: number): string {
  if (day < 10) {
    return '0' + day.toString();
  } else {
    return day.toString();
  }
}

export const creditCardFormat = (node: HTMLInputElement, length = 19) => {
  const formatCardNumber = (value: string) => {
    const regex = /^(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})$/g;
    const onlyNumbers = value.replace(/[^\d]/g, '');

    return onlyNumbers.replace(regex, (_regex, $1, $2, $3, $4) =>
      [$1, $2, $3, $4].filter((group) => !!group).join(' '),
    );
  };

  function updateValue(_e: Event) {
    node.value = formatCardNumber(node.value);
  }

  node.setAttribute('maxLength', length.toString());

  node.addEventListener('input', updateValue);
  node.addEventListener('paste', updateValue);

  return {
    destroy() {
      node.removeEventListener('input', updateValue);
      node.removeEventListener('paste', updateValue);
    },
  };
};

export const formatPhoneNumber = (node: HTMLInputElement) => {
  //Filter only numbers from the input
  const formatPhoneNumber = (str: string) => {
    const cleaned = ('' + str).replace(/\D/g, '');

    //Check if the input is of correct
    const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);

    if (match) {
      //Remove the matched extension code
      //Change this to format for any country code.
      const intlCode = match[1] ? '+1 ' : '';
      return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
    } else {
      return;
    }
  };

  function updateValue(_e: Event) {
    node.value = formatPhoneNumber(node.value) ?? node.value;
  }

  node.addEventListener('input', updateValue);
  node.addEventListener('paste', updateValue);
  return {
    destroy() {
      node.removeEventListener('input', updateValue);
      node.removeEventListener('paste', updateValue);
    },
  };
};

export function formatCentsToAmount(node: HTMLInputElement) {
  const formatCents = (cents: string) => {
    const onlyNumbers: number = cents.replace(/[^\d]/g, '') as unknown as number;
    return (onlyNumbers / 100)
      .toLocaleString('en-US', { style: 'currency', currency: 'USD' })
      .replace(/\.00$/, '');
  };

  function updateValue(_e: Event) {
    node.value = formatCents(node.value);
  }
  node.addEventListener('input', updateValue);
  node.addEventListener('paste', updateValue);
  return {
    destroy() {
      node.removeEventListener('input', updateValue);
      node.removeEventListener('paste', updateValue);
    },
  };
}

export function stateToAbbreviation(inputState: string, inputCountry?: string): string {
  if (inputCountry && inputCountry === 'United States') {
    const stateAbbrev = usStateAndAbbreviation.find((state) => {
      return state.name.toLowerCase().includes(inputState.toLowerCase());
    });
    if (stateAbbrev) return stateAbbrev?.abbreviation;
    return '';
  } else if (inputCountry && inputCountry === 'Canada') {
    const stateAbbrev = canadianProvincesAndAbbreviations.find((province) => {
      return province.name.toLowerCase().includes(inputState.toLowerCase());
    });
    if (stateAbbrev) return stateAbbrev?.abbreviation;
    return '';
  } else if (inputCountry) {
    const countryAbbreviation = allCountries.find((country) => country.name === inputCountry);
    if (countryAbbreviation) return countryAbbreviation.code;
    return '';
  } else {
    const stateAbbrev = usStateAndAbbreviation.find((state) => {
      return state.name.toLowerCase().includes(inputState.toLowerCase());
    });
    if (stateAbbrev) return stateAbbrev?.abbreviation;
    return '';
  }
}

export function fixInputReset(el: HTMLInputElement) {
  const form = el.form;
  if (!form) return;
  const handleReset = () => {
    // Set timeout is needed since `el.value` is only updated on the next frame
    setTimeout(() => {
      el.dispatchEvent(new Event('input'));
    }, 0);
  };
  form.addEventListener('reset', handleReset);
  return {
    destroy() {
      form.removeEventListener('reset', handleReset);
    },
  };
}
export function fixSelectReset(el: HTMLSelectElement) {
  const form = el.form;
  if (!form) return;
  const handleReset = () => {
    // Set timeout is needed since `el.value` is only updated on the next frame
    setTimeout(() => {
      el.dispatchEvent(new Event('input'));
    }, 0);
  };
  form.addEventListener('reset', handleReset);
  return {
    destroy() {
      form.removeEventListener('reset', handleReset);
    },
  };
}

export function listingUrl(
  type: 'member' | 'directory' | 'product' | 'listing',
  mainCategory?: string,
  subCategory?: string,
  title?: string,
  id?: string,
): string {
  let returnString: string =
    type === 'member' || type === 'directory'
      ? `/members`
      : type === 'listing'
      ? `/listings`
      : `/products`;

  if (mainCategory) {
    returnString = returnString.concat(`/${encodeURIComponent(mainCategory)}`);
  }
  if (subCategory) {
    returnString = returnString.concat(`/${encodeURIComponent(subCategory)}`);
  }
  if (title) {
    returnString = returnString.concat(`/${encodeURIComponent(title)}`);
  }
  if (id) {
    returnString = returnString.concat(`/${encodeURIComponent(id)}`);
  }
  return returnString;
}

export function dateToServerString(date: string): string {
  const splitTerm = date.split('-');
  const year = splitTerm[0],
    month = splitTerm[1],
    day = splitTerm[2];
  return month + '/' + day + '/' + year;
}

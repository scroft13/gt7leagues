/* eslint-disable @typescript-eslint/no-var-requires */
const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');
const withOpacityValue =
  (varName) =>
  ({ opacityValue }) =>
    opacityValue === undefined
      ? `hsl(var(--${varName}))`
      : `hsla(var(--${varName}) / ${opacityValue})`;

module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    colors: {
      primary: withOpacityValue('primary-color'),
      'primary-darken': withOpacityValue('primary-darken'),
      'primary-lighter': withOpacityValue('primary-lighter'),
      secondary: withOpacityValue('secondary-color'),
      'dark-mode-button-color': withOpacityValue('dark-mode-secondary-color'),
      'dark-mode-secondary-text': withOpacityValue('dark-mode-secondary-text'),
      'black-background': withOpacityValue('dark-mode-black-background'),
      'gray-background': withOpacityValue('dark-mode-gray-background'),

      copy: {
        base: withOpacityValue('text-base'),
        muted: withOpacityValue('text-muted'),
      },
      surface: {
        base: withOpacityValue('surface-base'),
        100: withOpacityValue('surface-100'),
        200: withOpacityValue('surface-200'),
        300: withOpacityValue('surface-300'),
        400: withOpacityValue('surface-400'),
        500: withOpacityValue('surface-500'),
        600: withOpacityValue('surface-600'),
        700: withOpacityValue('surface-700'),
        800: withOpacityValue('surface-800'),
        900: withOpacityValue('surface-900'),
        999: withOpacityValue('surface-999'),
      },
      transparent: 'transparent',
      current: 'currentColor',
      white: colors.white,
      black: colors.black,
      orange: colors.orange,

      // All colors below are for temporary use
      gray: colors.stone,
      'warm-gray': colors.stone,
      sky: colors.sky,
      cyan: colors.cyan,
      red: colors.red,
      blue: colors.blue,
      indigo: colors.indigo,
      lighten: 'hsla(60, 2%, 92%, 0.2)',
    },
    fontFamily: {
      sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      cursive: ['Dancing+Script'],
      allura: ['Allura'],
    },

    extend: {
      transitionDuration: { 250: '250ms', 350: '350ms' },
      boxShadow: {
        button: '0px 8px 20px 0',
        'button-shadow': '0px 8px 20px rgba(255, 60, 120, 0.2)',
        'menu-bar': '0px 10px 19px rgba(0, 0, 0, 0.1);',
        'menu-bar-light': '0px 10px 19px rgba(100, 100, 100, 0.3);',
        'listbox-shadow': '0px 2px 6px rgba(10, 8, 58, 0.15);',
      },
      screens: {
        '3xl': '2000px',
        xs: '385px',
        sm2: '555px',
        short: { raw: '(min-width: 1280px) and (max-height: 960px)' },
        vk: {
          raw: '(max-width: 767px) and (min-aspect-ratio: 4/5)',
        },
      },
      gridTemplateColumns: {
        checkout: '125px 3fr repeat(2, 1fr) 3fr',
        'gift-certs': '20px 80px 3fr 5fr repeat(2, 60px) 75px 150px',
        'account-certificates': '80px 2fr 3fr repeat(4, 1fr)',
        'listed-offers': '8fr 4fr repeat(5, 2fr)',
        'directory-listings': '5fr 3fr repeat(3, 2fr)',
        messages: '1fr repeat(2, 2fr) 120px',
        'dash-no-fees': 'repeat(2, 1fr) 3fr repeat(3, 1fr)',
        'dash-fees': 'repeat(2, 1fr) 3fr repeat(4, 1fr)',
        'dash-decline': 'repeat(2, 1fr) 3fr repeat(2, 1.5fr)',
        'transaction-no-fees': 'repeat(2, 1fr) 4fr repeat(4, 1fr)',
        'transaction-fees': 'repeat(2, 1fr) 4fr repeat(5, 1fr)',
        'checkout-complete': '1fr 4fr repeat(2, 1fr)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
  safelist: [{ pattern: /grid-cols-(.+)/ }, { pattern: /h-(.+)/ }],
};

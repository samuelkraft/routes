const { fontFamily } = require('tailwindcss/defaultTheme') // eslint-disable-line

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Proxima Nova', ...fontFamily.sans],
      },
      colors: {
        forest: {
          lightest: '#E8F5D6',
          light: '#E0EECD',
          DEFAULT: '#75A134',
          dark: '#466419',
          darkest: '#2F3427',
        },
      },
    },
    maxWidth: {
      '1/2': '50%',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

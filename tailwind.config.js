const { fontFamily } = require('tailwindcss/defaultTheme') // eslint-disable-line

module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
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
  plugins: [],
}

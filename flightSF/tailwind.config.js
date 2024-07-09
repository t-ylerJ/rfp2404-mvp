/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        xxs: '0.5rem',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [{
      light: {
        primary: '#FF9900',
        'base-content': '#525252',
        'base-300': '#f5f5f5',
        'neutral-content': '#cccccc',
        'secondary-content': '#737373',
      },
      dark: {
        primary: '#cccccc'
      }
    }]
  }
};

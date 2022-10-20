const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.{html,js}'],
  safelist: [{pattern: /(.)/}],
  theme: {
    extend: {
      colors: {
        white: '#ffffff',
        'blue-gray': colors.slate
      },
      width: {
        17: '68rem',
        18: '72rem'
      },
      scale: {
        '-100': '-1'
      }
    }
  }
};

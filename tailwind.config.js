module.exports = {
  content: [
    './src/**/*.{html,njk,js}',
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#F5F5DC',
          50: '#FFFFFE',  // Adding the lightest shade of cream
          100: '#FFFFF0',
          200: '#FAFAE6',
          300: '#F5F5DC',
          400: '#E6E6C3',
          500: '#D6D6AA'
        },
        earth: {
          DEFAULT: '#8B4513',
          50: '#F7E6DC',
          100: '#EBCBB8',
          200: '#D4A88C',
          300: '#BD855F',
          400: '#A66233',
          500: '#8B4513',
          600: '#723A10'
        },
        sage: {
          DEFAULT: '#B2BEB5',
          50: '#EFF1F0',
          100: '#E2E6E3',
          200: '#C7CFC9',
          300: '#B2BEB5',
          400: '#9DAB9F',
          500: '#87978A',
          600: '#738376'
        },
        ink: {
          DEFAULT: '#2C2A29',
          50: '#F5F5F5',
          100: '#E5E5E5',
          200: '#CCCCCC',
          300: '#2C2A29',
          400: '#1F1D1C',
          500: '#121110'
        },
        cozyBlack: '#2C2A29',
        brightYellow: '#ffea00',
        creamYellow: '#faf1af',
      },
      fontFamily: {
        'just-me': ['"Just Me Again Down Here"', 'cursive'],
        'unkempt': ['Unkempt', 'cursive'],
        'coustard': ['Coustard', 'serif'],
        'gaegu': ['Gaegu', 'cursive'],
        'assistant': ['Assistant', 'sans-serif'],
        sans: ['Assistant', 'Arial', 'sans-serif'],
        handwritten: ['Dancing Script', 'cursive'],
      },
    },
  },
  plugins: [],
}
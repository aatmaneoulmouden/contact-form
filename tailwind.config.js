/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*{.html,js}"],
  theme: {
    fontFamily: {
      'main': ['Karla', 'sans-serif'],
    },
    extend: {
      colors: {
        'light-green': 'hsl(148, 38%, 91%)',
        'dark-green': '#063F36',
        'green': 'hsl(169, 82%, 27%)',
        'red': 'hsl(0, 66%, 56%)',
        'neutral': {
          'white': 'hsl(0, 0%, 100%)',
          'medium-grey': 'hsl(186, 15%, 59%)',
          'dark-grey': 'hsl(187, 24%, 22%)',
        },
      }
    },
  },
  plugins: [],
}


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage:{
        'dark-bg': 'url("../src/assets/dark.jpg")',
        'light-bg': 'url("../src/assets/light.jpg")',
        'load-bg': 'url("../src/components/Loading/CloudLoading.gif")'
      },
      height:{
        '90':'90%'
      },
      fontFamily: {
        oleo: ['"Oleo Script"', 'cursive'],
        'playwrite': ['"Playwrite DE Grund"', 'cursive'],
      },
    },
  },
  plugins: [],
}

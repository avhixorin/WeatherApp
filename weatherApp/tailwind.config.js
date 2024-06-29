/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        'page-bg': 'url("../src/assets/sunSet-bg.jpg")',
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

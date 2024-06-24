/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        'page-bg': 'url("../src/assets/dark-clouds.jpg")'
      },
      height:{
        '90':'90%'
      }
    },
  },
  plugins: [],
}


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        custom1:['Card-Name','sans-serif'],
        custom2:['Card-Effect','sans-serif'],
        custom3:['Card-Attribute','sans-serif'],
        custom4:['Card-Normal','sans-serif'],
        custom5:['Stat-Numbers','sans-serif'],
      }
    },
  },
  plugins: [],
}


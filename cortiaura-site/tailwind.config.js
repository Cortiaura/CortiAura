/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./sections/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        darkAccent: '#41234E',
        secondaryAccent: '#4632C9',
        backgroundLight: '#F9F6FA',
        textDark: '#040207'
      },
      backgroundImage: {
        primaryGradient: 'linear-gradient(90deg, #AF98E4 0%, #9965E8 100%)'
      }
    },
  },
  plugins: [],
}

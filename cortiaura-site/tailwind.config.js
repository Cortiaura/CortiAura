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
        // CortiAura brand palette
        brandPrimary: '#970148', // Rose Garnet
        brandPrimaryLight: '#FBDDCF',
        brandDark: '#231F20',
        brandMisty: '#F9E4E5',
        brandWhite: '#FFFFFF',
      },
      backgroundImage: {
        primaryGradient: 'linear-gradient(90deg, #970148 0%, #FBDDCF 100%)'
      },
      fontFamily: {
        // Approximate brand typography
        sans: [
          'Gotham',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
        display: [
          'EB Garamond',
          'Garamond',
          'Georgia',
          'serif',
        ],
      }
    },
  },
  plugins: [],
}

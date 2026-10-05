/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './sections/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // CortiAura brand palette (brand standards)
        garnet: '#970148', // Rose Garnet: primary accent
        imperial: '#680238', // Imperial Purple: deep sections
        raisin: '#231F20', // Raisin Black: text and dark sections
        misty: '#F9E4E5', // Misty Rose: soft backgrounds
        blush: '#FBDDCF', // Pale Pink: highlights on dark
        ink: '#4A4446', // body text on light backgrounds
        muted: '#6B6365', // captions and small print
        line: '#EFE3E4', // borders on light backgrounds
      },
      fontFamily: {
        sans: ['"Instrument Sans"', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
        display: ['"EB Garamond"', 'Garamond', 'Georgia', 'serif'],
      },
      maxWidth: {
        site: '1200px',
      },
    },
  },
  plugins: [],
};

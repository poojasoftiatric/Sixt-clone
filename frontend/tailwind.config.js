/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sixt-orange': '#FF5000',
        'sixt-orange-hover': '#E04700',
        'sixt-black': '#0C0C0C',
        'sixt-dark-grey': '#191919',
        'sixt-light-grey': '#F3F3F3',
        'sixt-border': '#E5E5E5',
        'sixt-green': '#008248',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        condensed: ['"Roboto Condensed"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

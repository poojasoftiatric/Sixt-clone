/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sixt-orange': '#C5A059',
        'sixt-orange-hover': '#B28F4B',
        'sixt-black': '#0C0C0C',
        'sixt-dark-grey': '#191919',
        'sixt-light-grey': '#F3F3F3',
        'sixt-border': '#E5E5E5',
        'sixt-green': '#008248',
        'w-gold': '#C5A059',
        'w-gold-hover': '#B28F4B',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        condensed: ['"Roboto Condensed"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

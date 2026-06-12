/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'amor-red': '#e63946',
        'amor-pink': '#ffb3c6',
        'amor-gold': '#ffd166',
      }
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sri-lanka': {
          'teal': '#008080',
          'teal-dark': '#006666',
          'gold': '#FFD700',
          'saffron': '#FF9933',
          'ocean': '#0077BE',
          'sand': '#F4E4BC',
        }
      }
    },
  },
  plugins: [],
}

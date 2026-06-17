/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Satoshi', 'MiSans', 'sans-serif'],
        sans: ['Satoshi', 'MiSans', 'sans-serif'],
        serif: ['"Bigola Display"', 'AlimamaShuHeiTi', 'serif'],
      },
    },
  },
  plugins: [],
}

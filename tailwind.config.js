/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#F0E1DC",
        blush: "#D9C0B9",
        mauve: "#926F89",
        blue: "#5670A3",
        navy: "#181D45",
        primary: "#5670A3",
        surface: "#F0E1DC",
        accent: "#D9C0B9",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Cormorant Garamond', 'serif'],
      },
    },
  },
  plugins: [],
}

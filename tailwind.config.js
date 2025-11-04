const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    "bg-blue-700",
    "bg-red-700",
    "bg-pink-700",
    "bg-yellow-700",
    "bg-green-700",
    "bg-purple-700",
    "border-blue-700",
    "border-red-700",
    "border-pink-700",
    "border-yellow-700",
    "border-green-700",
    "border-purple-700",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1024px",
      xl: "1440px",
    },
    colors: {
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      blue: colors.blue,
      red: colors.red,
      pink: colors.pink,
      yellow: colors.amber,
      green: colors.emerald,
      purple: colors.violet,
    },
    extend: {},
  },
  plugins: [],
};

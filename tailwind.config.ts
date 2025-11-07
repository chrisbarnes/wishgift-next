import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
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

export default config;

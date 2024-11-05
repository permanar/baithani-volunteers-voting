import type { Config } from "tailwindcss";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const defaultColors = require("tailwindcss/colors");

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        urbanist: ["var(--font-urbanist)", "sans-serif"],
      },

      fontSize: {
        "3xs": ["0.5rem", { lineHeight: "2.5" }],
        "2xs": ["0.625rem", { lineHeight: "2" }],
        xs: ["0.75rem", { lineHeight: "1.6666666667" }],
      },

      borderRadius: {
        "4xl": "2.25rem",
      },
    },

    colors: {
      red: defaultColors.red,

      white: {
        DEFAULT: "#F8FFFA",
        900: "#FFFFFF",
      },
      black: {
        DEFAULT: "#252525",
        900: "#000000",
      },
      purple: {
        DEFAULT: "#CC7EAC",
      },
      gray: {
        300: "#D9D9D9",
        DEFAULT: "#949494",
        600: "#606060",
      },

      transparent: "transparent",
    },
  },
  plugins: [],
};
export default config;

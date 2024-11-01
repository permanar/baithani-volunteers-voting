import type { Config } from "tailwindcss";

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
    },

    colors: {
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
        DEFAULT: "#949494",
      },
    },
  },
  plugins: [],
};
export default config;

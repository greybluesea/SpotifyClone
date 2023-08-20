import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        BRAND: {
          DEFAULT: "var(--BRAND)",
        },

        PRIMARY: "var(--PRIMARY)",
        NEUTRAL: "var(--NEUTRAL)",
        HIGHLIGHT: "var(--HIGHLIGHT)",

        BGCOLOR: {
          DEFAULT: "var(--BGCOLOR-PRIMARY)",
          SECONDARY: "var(--BGCOLOR-SECONDARY)",
        },
      },
    },
  },
  plugins: [],
};
export default config;

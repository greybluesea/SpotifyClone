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
          SECONDARY: "var(--BRAND-SECONDARY)",
        },

        PRIMARY: "var(--PRIMARY)",
        SECONDARY: "var(--SECONDARY)",
        NEUTRAL: "var(--NEUTRAL)",
        HIGHLIGHT: "var(--HIGHLIGHT)",

        BGCOLOR: {
          DEFAULT: "var(--BGCOLOR-PRIMARY)",
          SECONDARY: "var(--BGCOLOR-SECONDARY)",
          TERTIARY: "var(--BGCOLOR-TERTIARY)",
        },

        BORDER: "var(--BORDER)",
      },
    },
  },
  plugins: [],
};
export default config;

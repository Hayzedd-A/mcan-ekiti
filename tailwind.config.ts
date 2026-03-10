import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1B6B3A",
          50: "#f0faf4",
          100: "#dcf3e7",
          200: "#bce8d0",
          300: "#8dd5b0",
          400: "#57ba87",
          500: "#33a068",
          600: "#237f51",
          700: "#1B6B3A",
          800: "#185a32",
          900: "#154a2a",
        },
        "primary-light": "#e8f5ee",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        heading: ["var(--font-outfit)", "sans-serif"],
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(135deg, #1B6B3A 0%, #2d8a52 100%)",
      },
    },
  },
  plugins: [],
};
export default config;

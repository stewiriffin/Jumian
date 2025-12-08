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
        jumia: {
          orange: "#F68B1E",
          dark: "#313133",
          light: "#F5F5F5",
        },
      },
    },
  },
  plugins: [],
};
export default config;

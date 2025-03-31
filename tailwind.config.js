/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    fontSize: {
      sm: "1.4rem",
      base: "1.5rem",
      lg: "1.6rem",
      xl: "1.8rem",
      "2xl": "2rem",
      "3xl": "2.4rem",
      "4xl": "2.8rem",
      "5xl": "3.2rem",
    },

    spacing: {
      1: "0.5rem",
      2: "1rem",
      3: "1.5rem",
      4: "2rem",
      5: "2.5rem",
      6: "3rem",
      7: "3.5rem",
      8: "4rem",
      9: "4.5rem",
      10: "5rem",
    },

    borderWidth: {
      DEFAULT: "0.1rem",
      0: "0",
      2: "0.2rem",
      3: "0.3rem",
      4: "0.4rem",
      5: "0.5rem",
    },

    fontFamily: {
      sans: ["Nunito Sans", "sans-serif"],
    },

    colors: {
      "blue-700": "hsl(209, 23%, 22%)",
      "blue-900": "hsl(207, 26%, 17%)",
      blue: "hsl(200, 15%, 8%)",
      "gray-100": "hsl(0, 0%, 98%)",
      "gray-700": "hsl(0, 0%, 52%)",
      white: "hsl(0, 0%, 100%)",
    },

    screens: {
      sm: "540px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px",
      "3xl": "1920px",
    },
  },
  plugins: [],
};


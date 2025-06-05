/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./client/app/**/*.{js,ts,jsx,tsx}",
    "./client/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#009e60", // Green
          dark: "#007a4a",
          light: "#00c97b",
          gradient1: "#009e60",
          gradient2: "#00cfff",
        },
        black: "#111111",
        lightblue: "#e6f7ff",
        white: "#ffffff",
      },
    },
  },
  plugins: [],
};
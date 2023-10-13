/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "color-primary": "#00668A",
        "color-secondary": "#004E71",
        "youcan": {
          50: "#fbf4f9",
          100: "#f9eaf4",
          200: "#f4d6e9",
          300: "#ecb5d7",
          400: "#df87bc",
          500: "#d163a2",
          600: "#be4484",
          700: "#ad3671",
          800: "#872d58",
          900: "#72294c",
          950: "#44132a",
        },
      },
    },
  },
  plugins: [],
};


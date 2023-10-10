/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "color-primary": "#00668A",
        "color-secondary": "#004E71",
      }
    },
  },
  plugins: [],
}


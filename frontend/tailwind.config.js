/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          300: "#dde4fe",
          500: "#6a6cb5",
          600: "#4444db"
        }
      }
    },
  },
  plugins: [],
}


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // ✅ This tells Tailwind what files to scan
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};


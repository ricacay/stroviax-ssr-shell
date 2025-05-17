/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}", // Support React JSX
  ],
  darkMode: 'class', // Enable dark mode via 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      boxShadow: {
        'xl-soft': '0 10px 20px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
};

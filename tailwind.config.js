/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // React component support
  ],
  darkMode: "class", // Enables dark mode via 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          primary: "#4F46E5",   // Indigo
          secondary: "#6366F1", // Indigo-light
          accent: "#10B981",    // Emerald
        },
      },
      boxShadow: {
        "xl-soft": "0 10px 20px rgba(0, 0, 0, 0.08)",
      },
    },
  },
  plugins: [],
};

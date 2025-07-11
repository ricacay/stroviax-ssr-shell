// postcss.config.js
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},   // ✅ Correct for Tailwind v4 with PostCSS
    autoprefixer: {},             // (optional but recommended)
  },
};

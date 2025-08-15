// ✅ Correct for Tailwind v4+
const tailwindcss = require('@tailwindcss/postcss');

module.exports = {
  plugins: [
    tailwindcss(),
    require('autoprefixer'),
  ],
};


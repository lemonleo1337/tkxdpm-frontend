const postcssImport = require('postcss-import');
const postcssAdvancedVariables = require('postcss-advanced-variables');
const tailwindcssNesting = require('tailwindcss/nesting');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');

module.exports = {
  plugins: [
    postcssImport(),
    postcssAdvancedVariables(),
    tailwindcssNesting(),
    tailwindcss('./tailwind.config.js'),
    autoprefixer(),
  ],
};
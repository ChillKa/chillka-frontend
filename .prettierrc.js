/** @type import('prettier').Config */
const config = {
  semi: true,
  trailingComma: 'es5',
  singleQuote: true,
  printWidth: 80,
  tabWidth: 2,
  bracketSpacing: true,
  arrowParens: 'always',
  endOfLine: 'lf',
  plugins: [require.resolve('prettier-plugin-tailwindcss')],
};

module.exports = config;

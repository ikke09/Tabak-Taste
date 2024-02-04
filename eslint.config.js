const { FlatCompat } = require('@eslint/eslintrc');
const eslintPluginReact = require('eslint-plugin-react');
const globals = require('globals');
const js = require('@eslint/js');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

module.exports = [
  ...compat.extends('standard-with-typescript', 'plugin:react/recommended'),
  { plugins: { react: eslintPluginReact } },
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: { ...globals.browser, ...globals.es2021, ...globals.node },
    },
  },
  { rules: {} },
];

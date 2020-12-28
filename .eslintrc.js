const path = require('path');
module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  plugins: ['@typescript-eslint', 'react'],
  env: {
    browser: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'prettier/react',
  ],
  parserOptions: {
    project: path.resolve(__dirname, './tsconfig.json'),
    tsconfigRootDir: __dirname,
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  rules: {
    'brace-style': 'off',
    'comma-spacing': 'off',
    'func-call-spacing': 'off',
    indent: 'off',
    'keyword-spacing': 'off',
    'no-duplicate-imports': 'off',
    'require-await': 'off',
    'no-console': [2, { allow: ['warn', 'error'] }],
    'no-else-return': 'error',
    'no-prototype-builtins': 0,
    semi: 'off',
    '@typescript-eslint/await-thenable': 2,
    '@typescript-eslint/brace-style': ['error'],
    '@typescript-eslint/class-literal-property-style': ['error', 'fields'],
    '@typescript-eslint/comma-spacing': ['error'],
    '@typescript-eslint/consistent-indexed-object-style': ['error', 'index-signature'],
    '@typescript-eslint/func-call-spacing': ['error'],
    '@typescript-eslint/indent': ['error'],
    '@typescript-eslint/keyword-spacing': ['error'],
    '@typescript-eslint/no-confusing-void-expression': ['error', { ignoreArrowShorthand: true }],
    '@typescript-eslint/no-duplicate-imports': ['error'],
    '@typescript-eslint/no-require-imports': ['error'],
    '@typescript-eslint/no-unnecessary-condition': ['error'],
    '@typescript-eslint/prefer-includes': ['error'],
    '@typescript-eslint/prefer-string-starts-ends-with': ['error'],
    '@typescript-eslint/require-await': ['error'],
    '@typescript-eslint/semi': ['error'],
    '@typescript-eslint/typedef': ['error'],
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/ban-types': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-empty-interface': 0,
    'react/no-direct-mutation-state': 'off',
    'react/no-deprecated': 'off',
    'react/no-string-refs': 'off',
    'react/require-render-return': 'off',
    'react/prop-types': 'off', // Is this incompatible with TS props type?,
  },
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
};

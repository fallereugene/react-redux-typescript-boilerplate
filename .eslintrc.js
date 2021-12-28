const path = require('path');
module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'react', 'prettier'],
    env: {
        browser: true,
        jest: true,
    },
    extends: [
        'airbnb',
        'airbnb-typescript',
        'airbnb/hooks',
        'plugin:jsx-a11y/recommended',
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'prettier',
    ],
    parserOptions: {
        project: path.resolve(__dirname, './tsconfig.json'),
        tsconfigRootDir: __dirname,
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    rules: {
        indent: 'off',
        'import/extensions': 'off',
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
        'import/prefer-default-export': 'off',
        'import/no-import-module-exports': 'off',
        'object-curly-newline': 'off',
        'no-new': 'off',
        'function-paren-newline': 'off',
        'max-len': ['error', { code: 120 }],
        'no-shadow': 'off',
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/ban-types': [
            'error',
            {
                extendDefaults: true,
                types: {
                    '{}': false,
                },
            },
        ],
        '@typescript-eslint/indent': ['error', 4],
        '@typescript-eslint/no-shadow': 0,
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off',
        'react/function-component-definition': [
            2,
            {
                namedComponents: 'arrow-function',
                unnamedComponents: 'arrow-function',
            },
        ],
        'prettier/prettier': [
            'error',
            {
                endOfLine: 'auto',
            },
        ],
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
};

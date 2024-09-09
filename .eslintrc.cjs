/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  // 'extends': [
  //   'eslint:recommended',
  // ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    // 'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 'prettier/prettier': [
    //   'error',
    //   {
    //     // bracketSameLine: false,
    //     printWidth: 120,
    //     singleAttributePerLine: true,
    //     singleQuote: true,
    //     semi: false,
    //     tabWidth: 2,
    //     trailingComma: 'es5',
    //     arrowParens: 'avoid',
    //   },
    // ],
    // 'no-else-return': ['error', { allowElseIf: false }],
    // 'no-multi-spaces': ['error', { ignoreEOLComments: false }],
    // 'prefer-template': 'error',
    // 'array-bracket-spacing': ['error', 'never'],
    // 'object-curly-spacing': ['error', 'always'],
    // 'curly': 'error',
    // 'jest/no-disabled-tests': 'off',
  }
}
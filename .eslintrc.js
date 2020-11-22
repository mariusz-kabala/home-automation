module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: [],
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.json',
  },
  env: {
    browser: false,
    node: true,
  },
  rules: {
    'no-warning-comments': 'warn',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/member-delimiter-style': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'react/display-name': 'off',
    'react/prop-types': 'off',
    'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
    'prettier/prettier': 'warn',
  },
}

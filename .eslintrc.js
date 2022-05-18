module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
    sourceType: 'module',
  },
  env: {
    browser: true,
    es6: true,
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'airbnb-base',
    'airbnb-typescript/base',
  ],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'comma-dangle': 'off',
        'import/export': 0,
        'no-param-reassign': 0,
        'operator-linebreak': 0,
        '@typescript-eslint/comma-dangle': 'off',
        '@typescript-eslint/default-param-last': 0,
        '@typescript-eslint/ban-ts-comment': 0,
      },
    },
  ],
};

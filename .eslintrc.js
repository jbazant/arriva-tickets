module.exports = {
  root: true,
  extends: '@callstack',
  parser: '@typescript-eslint/parser',
  env: {
    node: false,
    'react-native/react-native': true,
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: ['./tsconfig.json'],
      },
      plugins: ['@typescript-eslint', '@tanstack/query'],
      rules: {
        'react/react-in-jsx-scope': 'off',
        'react-native/no-raw-text': 'off',
        'react-native-a11y/has-accessibility-hint': 'off',
        'jest/no-disabled-tests': 'off',
        '@tanstack/query/exhaustive-deps': 'error',
        '@tanstack/query/prefer-query-object-syntax': 'error',
      },
    },
    {
      files: ['./jest/*', './**/*.pageObject.ts*'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
};

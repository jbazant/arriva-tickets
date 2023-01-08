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
      plugins: ['@typescript-eslint'],
      rules: {
        'react/react-in-jsx-scope': 'off',
        'react-native/no-raw-text': 'off',
        'react-native-a11y/has-accessibility-hint': 'off',
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

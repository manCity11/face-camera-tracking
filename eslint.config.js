module.exports = [
  {
    files: ['**/*.js'],
    ignores: ['node_modules/*', 'dist/*'],
    rules: {
      'prefer-const': 'error',
      'no-console': 'error',
      'no-unused-vars': 'error',
      'indent': ['error', 2],
      'quotes': ['error', 'single'],
      'comma-dangle': ['error', 'always-multiline'],
      'no-trailing-spaces': ['error', { 'ignoreComments': true }],
      'eol-last': ['error', 'always'],
    },
  },
];

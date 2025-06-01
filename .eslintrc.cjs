module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'], // fallback for tools, overridden per package
    sourceType: 'module',
    ecmaVersion: 'latest',
  },
  plugins: ['@typescript-eslint', 'import', 'unused-imports'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier',
  ],
  rules: {
    'unused-imports/no-unused-imports': 'error',
    'import/order': ['error', {
      alphabetize: { order: 'asc', caseInsensitive: true },
      groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
    }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
  },
  ignorePatterns: ['dist', 'node_modules'],
};

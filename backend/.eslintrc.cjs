module.exports = {
  extends: ['../.eslintrc.cjs'],
  parserOptions: {
    project: ['./tsconfig.eslint.json'],
  },
  env: {
    node: true,
  },
};

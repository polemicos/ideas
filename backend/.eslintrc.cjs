module.exports = {
  extends: ['../.eslintrc.cjs'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.eslint.json',
    sourceType: 'module'
},

  env: {
    node: true,
  },
};

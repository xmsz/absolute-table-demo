module.exports = {
  root: true,
  env: {
    es6: true,
  },
  extends: ['plugin:vue/essential', 'airbnb-base', 'alloy/typescript'],
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'arrow-parens': [0], // 待测试
    'import/prefer-default-export': [0], // 待测试
    'import/no-unresolved': [0], // 待测试
    'import/extensions': [0], // 待测试
    'object-curly-newline': [0], // 待测试
    indent: [0], // 待测试
    'no-underscore-dangle': [0], // 待测试
    'import/no-unresolved': [0], // 待测试
    'max-len': [0], // 待测试
    'operator-linebreak': [
      2,
      'after',
      {
        overrides: {
          '?': 'before',
          ':': 'before',
        },
      },
    ], // 待测试
  },
  plugins: ['@typescript-eslint', 'vue'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    sourceType: 'module', // 待测试
    ecmaVersion: 2018, // 待测试
    parser: '@typescript-eslint/parser',
    ecmaFeatures: {
      jsx: true,
    },
  },
  globals: {},
};

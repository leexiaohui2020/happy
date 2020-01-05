module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'import/no-unresolved': [2, { ignore: ['antd-mobile'] }],
    'import/extensions': [2, 'never', { vue: 'never' }],
  },
  parserOptions: {
    parser: 'babel-eslint',
  }
};

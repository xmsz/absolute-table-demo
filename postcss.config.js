module.exports = {
  ident: 'postcss',
  plugins: {
    autoprefixer: {},
    'postcss-px-to-viewport': {
      viewportWidth: 750,
      landscapeWidth: 568 * 2,
    },
  },
};

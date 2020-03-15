const sass = require('sass');

module.exports = () => {
  return {
    loader: 'sass-loader',
    options: {
      prependData: '@import "@/assets/sass/com.scss";',
      implementation: sass
    }
  };
};

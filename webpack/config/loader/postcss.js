const autoprefixer = require('autoprefixer');

const { getAbsolutePath } = require('../../lib/path');
const CONF_PATH = getAbsolutePath('./postcss.config.js');

module.exports = () => {
  return {
    loader: 'postcss-loader',
    options: {
      config: {
        path: CONF_PATH,
      },
    },
  };
};

/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/no-require-imports */
const { getAbsolutePath } = require('../../lib/path');

// 路径
const CONF_PATH = getAbsolutePath('./.eslintrc.js');
const NODE_MODULES_PATH = getAbsolutePath('./node_modules');

module.exports = () => {
  return {
    enforce: 'pre',
    test: /\.(js|vue|ts)$/,
    loader: 'eslint-loader',
    exclude: /node_modules/,
    options: {
      configFile: CONF_PATH,
      resolvePluginsRelativeTo: NODE_MODULES_PATH,
    },
  };
};

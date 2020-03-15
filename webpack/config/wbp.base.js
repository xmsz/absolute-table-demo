/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable import/no-extraneous-dependencies */
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const { getAbsolutePath, PROJECT_PATH } = require('../lib/path');

const NODE_MODULES_PATH = getAbsolutePath('/node_modules');

process.traceDeprecation = true;

module.exports = {
  entry: {
    app: './src/main',
  },
  context: PROJECT_PATH,
  plugins: [new VueLoaderPlugin()],
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
      '@projectRoot': PROJECT_PATH,
      '@': `${PROJECT_PATH}/src`,
      vue$: `${PROJECT_PATH}/node_modules/vue/dist/vue.esm.js`,
    },
  },
  resolveLoader: {
    modules: [NODE_MODULES_PATH],
  },
  node: {
    setImmediate: false,
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
};

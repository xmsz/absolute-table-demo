const GlobalConf = require('./global.conf.js').default;

module.exports = {
  devServer: {
    port: 8081,
    proxy: {
      '/api': {
        target: GlobalConf.BASE_URL,
        changeOrigin: true,
      },
    },
  },
};

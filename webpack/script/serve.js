const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const fs = require('fs-extra');

// CONF
const webpackConfig = require('../config/wbp.dev');

// Utils
function simpleDeepCopy(data) {
  return JSON.parse(JSON.stringify(data));
}

const devDefaultConf = () => {
  return simpleDeepCopy({
    clientLogLevel: 'warning',
    inline: true,
    useLocalIp: false,
    hot: true,
    progress: true,
    contentBase: false,
    compress: true,
    host: '0.0.0.0',
    port: 8083,
    socket: 'socket',
    open: false,
    disableHostCheck: true,
    quiet: true,
    publicPath: '/',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    },
    overlay: {
      warnings: true,
      errors: true,
    },
    stats: {
      colors: true,
    },
  });
};

// Path
const { getProjectPath } = require('../lib/path');

async function main() {
  console.info('正在启动项目');

  // STEP: 获取用户项目的配置文件
  let projectWebpackConfig = {};
  if (fs.existsSync(getProjectPath('webpack.config.js'))) {
    projectWebpackConfig = require(getProjectPath('webpack.config.js'));
  }

  // STEP: 配置服务器
  const compiler = Webpack(webpackConfig);
  const devServerOptions = Object.assign(
    {},
    devDefaultConf(),
    projectWebpackConfig.devServer ? simpleDeepCopy(projectWebpackConfig.devServer) : {},
  );

  // STEP: 打开服务器
  const server = new WebpackDevServer(compiler, devServerOptions);
  const { port, host } = devServerOptions;

  server.listen(port, host, () => {
    console.info(`启动成功: http://${host}:${port}`);
  });
}

main();

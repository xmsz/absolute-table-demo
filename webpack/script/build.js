const Webpack = require('webpack');
const rm = require('rimraf');

// CONF
const webpackConfig = require('../config/wbp.prod');

async function main() {
  console.info('构建中...');

  rm(webpackConfig.output.path, err => {
    if (err) throw err;
    Webpack(webpackConfig, (err, stats) => {
      if (err) throw err;
      process.stdout.write(
        stats.toString({
          colors: true,
          modules: false,
          children: false,
          chunks: false,
          chunkModules: false
        }) + '\n\n'
      );

      if (stats.hasErrors()) {
        console.error('构建失败啦 \n');
        process.exit(1);
      }
      console.info('构建完成！\n');
    });
  });
}

main();

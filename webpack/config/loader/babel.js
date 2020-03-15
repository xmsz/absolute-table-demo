// "@vue/cli-plugin-babel/preset"

// const babelConfig = {
//   presets: [
//     require.resolve('vca-jsx'),
//     require.resolve('@babel/preset-env'),
//     require.resolve('@babel/preset-typescript'),
//   ],
//   plugins: [
//     [require.resolve('@babel/plugin-proposal-decorators'), { legacy: true }],
//     [require.resolve('@babel/plugin-proposal-class-properties'), { loose: true }],
//     [
//       require.resolve('@babel/plugin-transform-runtime'),
//       {
//         corejs: false,
//         helpers: true,
//         regenerator: true,
//         useESModules: false,
//       },
//     ],
//   ],
//   cacheDirectory: false,
// };

module.exports = () => {
  return {
    test: /\.(js|ts|tsx)$/,
    exclude: /(node_modules|bower_components)/,
    use: {
      loader: 'babel-loader',
      options: require('../../../babel.config'),
    },
  };
};

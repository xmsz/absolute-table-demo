const merge = require('webpack-merge');
const base = require('./wbp.base.js');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

// Loaders
const babelLoader = require('./loader/babel')();
const vueLoader = require('./loader/vue')();
const postcssLoader = require('./loader/postcss')();
const urlLoader = require('./loader/url')();
const sassLoader = require('./loader/sass')();

// Rules
const EslintRules = require('./rules/pre_eslint')();

module.exports = merge(base, {
  mode: 'development',
  output: {
    filename: 'js/[name].[hash].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsPlugin(),
  ],
  module: {
    rules: [
      EslintRules,
      vueLoader,
      babelLoader,
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader', postcssLoader],
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          // {
          //   loader: 'px2rem-loader',
          //   options: {
          //     remUni: 750
          //   }
          // },
          postcssLoader,
          sassLoader,
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [urlLoader],
      },
    ],
  },
});

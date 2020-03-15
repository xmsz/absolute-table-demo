const merge = require('webpack-merge');
const base = require('./wbp.base.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin');
const AutoDllPlugin = require('autodll-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');

// Path
const { getProjectPath } = require('../lib/path');

// Laoaders
const babelLoader = require('./loader/babel')();
const vueLoader = require('./loader/vue')();
const postcssLoader = require('./loader/postcss')();
const urlLoader = require('./loader/url')({
  env: 'production',
});
const sassLoader = require('./loader/sass')();

module.exports = merge(base, {
  mode: 'production',
  devtool: 'source-map',
  output: {
    filename: 'js/[name].[contenthash].js',
    publicPath: './',
    path: getProjectPath('dist'),
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      chunkFilename: 'css/[name].[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        caseSensitive: true,
        collapseBooleanAttributes: true,
        collapseInlineTagWhitespace: true,
        keepClosingSlash: true,
        minifyCSS: true,
        minifyJS: true,
        removeEmptyAttributes: true,
      },
    }),

    new ModuleConcatenationPlugin(),
    new AutoDllPlugin({
      inject: true,
      debug: false,
      filename: 'dll_[contenthash].js',
      path: 'js',
      entry: {
        vendor: ['wx_js_plus', 'axios'],
      },
    }),
    new HtmlIncludeAssetsPlugin({
      assets: ['https://cdn.staticfile.org/vue/2.6.10/vue.min.js'],
      append: false,
      publicPath: false,
    }),
  ],
  externals: {
    vue: 'Vue',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', postcssLoader],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          // {
          //   loader: 'px2rem-loader',
          //   options: {
          //     remUni: 750,
          //   },
          // },
          postcssLoader,
          sassLoader,
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [urlLoader],
      },
      vueLoader,
      babelLoader,
    ],
  },
  optimization: {
    noEmitOnErrors: true,
    providedExports: true,
    removeAvailableModules: true,
    removeEmptyChunks: true,
    mergeDuplicateChunks: true,
    runtimeChunk: true,
    splitChunks: {
      chunks: 'all',
      minSize: 2000,
      maxSize: 0,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
    minimize: true,
    minimizer: [
      new TerserPlugin(),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          discardComments: {
            removeAll: true,
          },
        },
      }),
    ],
  },
});

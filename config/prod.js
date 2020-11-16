const paths = require('./paths');
const { merge } = require('webpack-merge');
const shared = require('./shared.js');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(shared, {
  // sets appropriate mode
  mode: 'production',

  // sets type of source-map https://webpack.js.org/configuration/devtool/
  devtool: 'source-map',

  // specifies output directory
  output: {
    path: paths.BUILD,
    publicPath: './',
    filename: '[name].[contenthash].js',
  },

  optimization: {
    minimize: true,
    //   css plugin minimizes css, terser plugin minimizes js
    minimizer: [new OptimizeCssAssetsPlugin({}), new TerserPlugin()],
  },

  module: {
    rules: [
      // plugin extracts css to separate file - for production only
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },

  plugins: [
    //   plugin generates an HTML5 file that includes all webpack bundles in the body using script tags
    // Generates deprecation warning: https://github.com/jantimon/html-webpack-plugin/issues/1501
    new HtmlWebpackPlugin({
      template: paths.SRC + '/index.html', // template file
      filename: 'index.html', // output file
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
    }),
    // Extracts CSS into separate files
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[name].[id].[contenthash].css',
    }),
  ],
});

const paths = require('./paths');

const { merge } = require('webpack-merge');
const shared = require('./shared');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(shared, {
  // sets appropriate mode
  mode: 'development',

  // sets type of source-map https://webpack.js.org/configuration/devtool/
  devtool: 'eval-cheap-module-source-map',

  module: {
    rules: [
      // css shall be injected into DOM
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },

  plugins: [
    //   plugin generates an HTML5 file that includes all webpack bundles in the body using script tags
    // Generates deprecation warning: https://github.com/jantimon/html-webpack-plugin/issues/1501
    new HtmlWebpackPlugin({
      template: paths.SRC + '/index.html', // template file
      filename: 'index.html', // output file
    }),
  ],

  devServer: {
    historyApiFallback: true,
    contentBase: paths.BUILD,
    open: true,
    compress: true,
    stats: 'errors-only',
    port: 7000,
  },
});

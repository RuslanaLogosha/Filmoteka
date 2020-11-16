const paths = require('./paths');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  // specifies entry point from which webpack will build a bundle
  entry: [paths.SRC + '/index.js'],

  // Where webpack outputs the assets and bundles
  output: {
    path: paths.BUILD,
    filename: '[name].js',
    publicPath: '/',
  },

  // Determine how modules within the project are treated
  module: {
    rules: [
      // babel adds necessary polyfills to convert ES6 syntax to code that can be interpreted by older browsers
      { test: /\.js$/, exclude: /node_modules/, use: ['babel-loader'] },

      // if file is small it will be processed with url-loader and will be encoded to base64 (inlined)
      // otherwise file will be copied to build folder
      {
        test: /\.(ico|webp|gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              disable: true, // webpack@2.x and newer
              mozjpeg: {
                progressive: true,
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75,
              },
            },
          },
        ],
      },

      /// url-loader encodes files to base64 and includes them inline rather than having them loaded as separate files with another request.
      // it works for small files and reduces overall number of requests
      {
        test: /\.woff(2)?(\?[a-z0-9#=&.]+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
              limit: 10000,
              mimetype: 'application/font-woff',
            },
          },
        ],
      },
      {
        test: /\.(ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },

      // Exports HTML as string
      {
        test: /\.html$/,
        use: 'html-loader',
      },

      // adds hbs template loader
      {
        test: /\.hbs$/,
        use: 'handlebars-loader',
      },
    ],
  },

  plugins: [
    // cleans BUILD directory after each npm launch
    new CleanWebpackPlugin(),
  ],
};

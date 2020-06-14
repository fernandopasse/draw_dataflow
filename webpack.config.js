const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PUBLIC_DIR = 'dist'

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, PUBLIC_DIR),
    port: 3340
  },
  entry: path.resolve(__dirname, 'src', 'index.js'),
  mode: 'development',
  module: {
    rules: [
      {
        exclude: /node_modules/,
        use: [{loader: 'babel-loader', options: {
          presets: [
            '@babel/preset-env'
          ]
        }}, 
        // {loader: 'eslint-loader'}
      ],
        test: /\.js$/
      },
      {
        exclude: /node_modules/,
        test: /\.css$/,
        loaders: [
            'style-loader',
            'css-loader'
        ]
      },
      {
        test: /\.(scss)$/,
        use: [{
          loader: 'style-loader', // inject CSS to page
        }, {
          loader: 'css-loader', // translates CSS into CommonJS modules
        }, {
          loader: 'postcss-loader', // Run post css actions
          options: {
            plugins: function () { // post css plugins, can be exported to postcss.config.js
              return [
                require('precss'),
                require('autoprefixer')
              ];
            }
          }
        }, {
          loader: 'sass-loader' // compiles Sass to CSS
        }]
      }
    ]
  },
  output: {
    filename: '[name]-[hash].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, PUBLIC_DIR, 'index.html')
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
  ],
  // externals: {
  //   jquery: 'jquery'
  // },
  resolve: {
    alias: {
      jquery: "jquery/src/jquery",
    }
  },
  target: 'web'
}

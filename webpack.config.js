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
        loader: 'babel-loader',
        query: {
          presets: [
            '@babel/preset-env'
          ]
        },
        test: /\.js$/
      },
      {
        exclude: /node_modules/,
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          }
        ]

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
    // new webpack.ProvidePlugin({
    //   $: 'jquery',
    //   jQuery: 'jquery'
    // })
  ],
  // externals: {
  //   jquery: 'jquery'
  // },
  // resolve: {
  //   alias: {
  //     jquery: "jquery/src/jquery"
  //   }
  // },
  target: 'web'
}

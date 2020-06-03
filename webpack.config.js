const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PUBLIC_DIR = 'dist'

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, PUBLIC_DIR),
    port: 3340
  },
  entry: path.resolve('./src/index.ts'),
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
        test: /\.js$/,
      },
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: 'ts-loader',
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
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  output: {
    filename: '[name]-[hash].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, PUBLIC_DIR, 'index.html')
    })
  ],
  target: 'web'
}

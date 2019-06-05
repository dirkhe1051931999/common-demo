const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  mode: 'production',
  entry: {
    'app': path.resolve(__dirname, 'src', 'main.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  resolve: {
    alias: {
      jquery: path.resolve(__dirname, 'src', "jquery")
    },
    extensions: ['.js']
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: process.cwd(),
      manifest: require(path.join(__dirname, 'dist', 'vendor-manifest.json'))
    }),
    new HtmlWebpackPlugin({})
  ]
}
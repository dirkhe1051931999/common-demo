const path = require('path')
const webpack = require('webpack')
module.exports = {
  mode: 'production',
  resolve: {
    alias: {
      jquery: path.resolve(__dirname, 'src', "jquery")
    },
    extensions: ['.js']
  },
  entry: {
    // 定义程序中打包公共文件的入口文件vendor.js
    vendor: [path.resolve(__dirname, 'src', 'vendor.js')],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].dll.js',
    library: '[name]_[hash]',
    libraryTarget: 'this'
  },
  plugins: [
    new webpack.DllPlugin({
      context: __dirname,
      path: path.join(__dirname, 'dist', '[name]-manifest.json'),
      name: '[name]_[hash]'
    })
  ]
}
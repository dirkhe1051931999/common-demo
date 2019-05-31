const path = require('path')
// 查看webpack bundle.js文件引用的模块大小
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// 减少lodash的体积的插件
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
module.exports = {
  mode: 'production',
  entry: ['babel-polyfill', path.join(__dirname, './src/index.js')],
  output: {
    path: path.join(__dirname, './bundle'),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: ['babel-loader'],
      include: path.join(__dirname, 'src'),
      exclude: /node_modules/
    }]
  },
  plugins: [
    new BundleAnalyzerPlugin(),
    new LodashModuleReplacementPlugin({
      'collections': true,
      'paths': true
    })
  ]
}
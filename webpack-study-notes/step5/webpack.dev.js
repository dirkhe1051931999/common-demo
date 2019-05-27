const path = require("path")
const merge = require('webpack-merge')
const commonConfig = require('./webpack.common.js');
// 开发文件，在通用文件下面进行扩展，合并并替换个性化配置 webpack.dev.js
module.exports = merge(commonConfig, {
  devtool: 'source-map',
  // 服务器配置
  devServer: {
    // 端口号
    port: 3000,
    // 打包进度
    progress: true,
    // 模块热替换
    hot: true,
    // 指定哪个运行目录
    contentBase: path.join(__dirname, 'bundle')
  },
})
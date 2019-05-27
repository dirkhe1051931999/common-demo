const merge = require('webpack-merge')
const commonConfig = require('./webpack.common.js');
// 生产文件，在通用文件下进行扩展，合并并替换个性化配置，webpack.prod.js
module.exports = merge(commonConfig, {
  optimization: {
    splitChunks: {
      cacheGroups: {
        verdor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
  }
})
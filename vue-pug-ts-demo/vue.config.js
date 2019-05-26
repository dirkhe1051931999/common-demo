const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  lintOnSave: true,
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('api', resolve('src/api'))
      .set('components', resolve('src/components'))
      .set('common', resolve('src/common'))
      .set('store', resolve('src/store'))
      .set('views', resolve('src/views'))
    config.module.rule('pug')
      .test(/\.pug/)
      .use('pug-html-loader')
      .loader('pug-html-loader')
      .end()
  }
}
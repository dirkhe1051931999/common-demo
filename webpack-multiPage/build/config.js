'use strict'

const resolve = require('./utils').resolve

let config = {
  projectPath: resolve('/'),
  srcPath: resolve('/src/'),
  node_modulesPath: resolve('/node_modules/'), 

  htmlPath: resolve('/src/'),
  jsPath: resolve('/src/scripts/'),

  setEnterJs: ['setEnterJs'],
  assetsSubDirectory: resolve('/src/static/'),
  page404: '404.html',
  hashNumber: 6,
  dev: {
    host: 'localhost',
    port: '3000',
    useEslint: false,
    showEslintErrorsInOverlay: true,
    devSourceMap: false,
    devtool: 'eval-source-map',
    assetsPublicPath: '/',

    proxyTable: {
      '/api': 'http://localhost:9000'
    }
  },
  build: {
    prodSourceMap: false,
    devtool: 'source-map',
    assetsRoot: resolve('/dist'),
    assetsPublicPath: './',
    copyStaticToPath: resolve('/dist/static/')
  }
}
console.log('初始化完成')
module.exports = config

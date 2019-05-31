const path = require('path')
const fs = require('fs')
const config = require('./config.js')
const resolve = require('./utils.js').resolve
const HTMLWebpackPlugin = require('html-webpack-plugin')

// 获取所有html文件名的集合，用于生成入口
let getFileNameList = path => {
  console.log("正在获取html文件名")
  let fileList = []
  let dirList = fs.readdirSync(path)
  dirList.forEach(item => {
    if (item.indexOf('.html') > -1) {
      fileList.push(item.split('.')[0])
    }
  })
  return fileList
}
// 获取所有html文件名的集合
const htmlDirs = getFileNameList(config.htmlPath)
// 缓存编译HTML的插件，多个页面，对应多个html编译插件，一个插件只能有一个入口
let HTMLPlugins = []
// 缓存入口列表
let Entries = {}
// 遍历所有html文件名集合，生成HTMLWebpackPlugin实例
htmlDirs.forEach(page => {
  let htmlConfig = {
    filename: `${page}.html`,
    template: path.join(config.htmlPath, `${page}.html`)
  }
  console.log("正在获取多页面入口文件")
  // https://www.webpackjs.com/concepts/entry-points/
  let found = config.setEnterJs.findIndex(val => {
    return val == page
  })

  if (found == -1) {
    htmlConfig.chunks = [page, 'default', 'vendors']
    Entries[page] = config.jsPath + `${page}.js`
  } else {
    htmlConfig.chunks = []
  }
  HTMLPlugins.push(new HTMLWebpackPlugin(htmlConfig))
})
// eslint的一些配置
const ESlintRule = () => ({
  test: /\.(js)$/,
  loader: 'eslint-loader',
  // pre是预处理：希望eslint只是审查，不是改变
  enforce: 'pre',
  include: [config.srcPath],
  options: {
    formatter: require('eslint-friendly-fromatter'),
    // 是否显示警告信息
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})
console.log("执行构建")
module.exports = {
  // 插入，入口文件，都会从这个路径查找
  context: config.projectPath,
  entry: Entries,
  resolve: {
    extensions: ['.js', '.vue', '.css', '.json', '.less'],
    alias: {
      '@': resolve('/src/'),
      js: resolve('/scripts/')
    }
  },
  module: {
    rules: [
      // 开启了eslint后，是这样的=>[{...}]
      ...(config.dev.useEslint ? [ESlintRule()] : []),
      {
        test: /\.js$/,
        include: [config.srcPath],
        exclude: [config.assetsSubDirectory],
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        include: [config.srcPath],
        exclude: [config.assetsSubDirectory],
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: `font/[name].[hash:${config.hashNumber}].[ext]`,
              fallback: 'file-loader'
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        include: [config.srcPath],
        exclude: [config.assetsSubDirectory],
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8092,
              name: `images/[name].[hash:${config.hashNumber}].[ext]`,
              // 如果小于8k，使用url-loader，大于8k，回退使用file-loader
              fallback: 'file-loader'
            }
          }
        ]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: `media/[name].[hash:${config.hashNumber}].[ext]`,
          fallback: 'file-loader'
        }
      }
    ]
  },
  plugins: [...HTMLPlugins]
}

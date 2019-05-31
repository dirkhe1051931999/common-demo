// 基础webpack
const webpackBase = require('./webpack.config.common.js')
// 参数
const config = require('./config.js')
// webpack
const webpack = require('webpack')
// webpack-merge
const webpackMerge = require('webpack-merge')
// 清除构建文件夹
const cleanWebpackPlugin = require('clean-webpack-plugin')
// 压缩js
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
//  复制指定文件到指定文件夹
const CopyWebpackPlugin = require('copy-webpack-plugin')
// 提取css，来源多个时，要实例化多个
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
// 压缩提取出的css，解决ExtractTextPlugin分离出的js重复问题(多个文件引入同一css文件)
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

// 直接导入的css
const cssExtracter = new ExtractTextWebpackPlugin({
  filename: `styles/[name].css.[hash:${config.hashNumber}].css`,
  allChunks: true
})
// 直接导入的less
const lessExtracter = new ExtractTextWebpackPlugin({
  filename: `styles/[name].less.[hash:${config.hashNumber}].css`, // 直接导入的css文件，提取时添加-css标识
  allChunks: true
})
// webpack-prod
const webpackProd = {
  mode: 'production',
  // 输出
  output: {
    // 相对服务器根目录的路径
    publicPath: config.build.assetsPublicPath,
    // 最终构建的文件名
    filename: `scripts/[name].[chunkhash:${config.hashNumber}].dll.js`,
    // 按需加载的js构建后的名字
    chunkFilename: `scripts/[id][chunkhash:${config.hashNumber}].dll.js`
  },
  // 是否开启 sourceMap
  devtool: config.build.prodSourceMap ? config.build.devtool : false,
  module: {
    rules: [
      {
        test: /\.css$/,
        include: [config.srcPath],
        exclude: [config.assetsSubDirectory],
        use: cssExtracter.extract({
          fallback: 'style-loader',
          use: [{ loader: 'css-loader', options: { sourceMap: config.dev.prodSourceMap } }, { loader: 'postcss-loader', options: { sourceMap: config.dev.prodSourceMap } }],
          // css的相对路径
          publicPath: '../'
        })
      },
      {
        test: /\.less$/,
        include: [config.srcPath],
        exclude: [config.assetsSubDirectory],
        use: lessExtracter.extract({
          fallback: 'style-loader',
          use: [{ loader: 'css-loader', options: { sourceMap: config.dev.prodSourceMap } }, { loader: 'postcss-loader', options: { sourceMap: config.dev.prodSourceMap } }, { loader: 'less-loader', options: { sourceMap: config.dev.prodSourceMap } }],
          // css的相对路径
          publicPath: '../'
        })
      }
    ]
  },
  plugins: [
    // 提取css和less
    cssExtracter,
    lessExtracter,
    // 压缩提取的css，并且做了防止误删css3的前缀
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/,
      cssProcessor: require('cssnano'),
      canPrint: true
    }),
    //

    new cleanWebpackPlugin(['dist'], {
      // dist的路径
      root: config.projectPath,
      verbose: true,
      dry: false
    }),
    new CopyWebpackPlugin([
      {
        from: config.assetsSubDirectory,
        to: config.build.copyStaticToPath,
        ignore: ['.*']
      }
    ]),
    // 一些优化项
    // 压缩JS
    new UglifyJSPlugin({
      sourceMap: config.build.prodSourceMap,
      // 使用多进程并行运行和文件缓存来提高构建速度
      parallel: true,
      uglifyOptions: {
        compress: {
          // 在删除不可用代码或未使用的声明等时显示警告
          warnings: false
        }
      }
    }),
    // 提升代码在浏览器中的执行速度
    new webpack.optimize.ModuleConcatenationPlugin(),
    // 编译时出现错误时，使用跳过编译阶段。防止出现错误代码混入
    new webpack.NoEmitOnErrorsPlugin(),
    // 根据模块的相对路径生成一个四位数的hash作为模块id
    new webpack.HashedModuleIdsPlugin()
  ],
  optimization: {
    // 优化chunk
    splitChunks: {
      // 表示从哪些chunks里面抽取代码，除了三个可选字符串值 initial、async、all 之外，还可以通过函数来过滤所需的 chunks
      chunks: 'async',
      // 表示抽取出来的文件在压缩前的最小大小，默认为 30000
      minSize: 30000,
      // 表示抽取出来的文件在压缩前的最大大小，默认为 0，表示不限制最大大小
      maxSize: 0,
      // 表示被引用次数，默认为1
      minChunks: 1,
      // 最大的按需(异步)加载次数，默认为 5
      maxAsyncRequests: 5,
      // 最大的初始化加载次数，默认为 3
      maxInitialRequests: 3,
      // 抽取出来的文件的自动生成名字的分割符，默认为 ~
      automaticNameDelimiter: '~',
      // 抽取出来文件的名字，默认为 true，表示自动生成文件名
      name: true,
      // 缓存组
      cacheGroups: {
        vendors: {
          // 表示要过滤 modules，默认为所有的 modules，可匹配模块路径或 chunk 名字，当匹配的是 chunk 名字的时候，其里面的所有 modules 都会选中
          test: /[\\/]node_modules[\\/]/,
          // 表示抽取权重，数字越大表示优先级越高。因为一个 module 可能会满足多个 cacheGroups 的条件，那么抽取到哪个就由权重最高的说了算
          priority: -10,
          // 名字
          name: 'common',
          // 从哪些chunks抽取代码
          chunks: 'async'
        },
        default: {
          // 表示被引用次数，默认为1
          minChunks: 2,
          // 表示抽取权重，数字越大表示优先级越高。因为一个 module 可能会满足多个 cacheGroups 的条件，那么抽取到哪个就由权重最高的说了算
          priority: -20,
          // 表示是否使用已有的 chunk，如果为 true 则表示如果当前的 chunk 包含的模块已经被抽取出去了，那么将不会重新生成新的
          reuseExistingChunk: true
        }
      }
    }
  }
}
module.exports = webpackMerge(webpackBase, webpackProd)

const path = require("path");
// 基础文件
const webpackBase = require("./webpack.config.common.js");
// 配置文件
const config = require("./config.js");
// webpack
const webpack = require("webpack");
// webpack推荐的合并方法
const webpackMerge = require("webpack-merge");
// 友好的输出错误
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
// 打印错误
const resolveError = require("./utils.js").createNotifierCallback;
const styleLoaders = require("./utils.js").styleLoaders;
// 多页面
const multiplePage = require("./multiple.page");

// dev环境的配置文件
const webpackDev = {
  // 模式
  mode: "development",
  // 设置dev-tool
  devtool: config.dev.devtool,
  // webpack-dev-server
  devServer: {
    // 服务开启后，是否自动打开浏览器
    open: false,
    // host
    host: config.dev.host,
    // 端口
    port: config.dev.port,
    // 是否允许浏览器使用本地IP打开
    useLocalIp: false,
    // 是否热替换
    hot: true,
    // 是否开始gzip
    compress: true,
    // dev服务器根目录
    contentBase: "./src/",
    // 开启后，只显示启动信息，其他都不会打印在控制台中
    quiet: true,
    // 是否在浏览器中，显示错误信息
    overlay: true,
    // 内联模式，实时重载脚本，插入构建后的环境中，构建消息会在浏览器控制台
    inline: true,
    // 哪些消息会出现在控制台
    clientLogLevel: "warning",
    // 当其中 html5 history 路由模式，404响应，会被替换成index.html
    historyApiFallback: {
      rewrites: [
        {
          from: /.*/,
          to: path.posix.join(config.dev.assetsPublicPath, config.page404)
        }
      ]
    },
    // 静态文件夹
    publicPath: config.dev.assetsPublicPath,
    // 开启代理
    proxy: config.dev.proxyTable
  },
  module: {
    rules: styleLoaders({
      sourceMap: config.dev.devSourceMap,
      extract: false
    })
  },
  //
  plugins: [
    ...multiplePage.htmlPlugins(),
    // 启动热替换
    new webpack.HotModuleReplacementPlugin(),
    // 编译如果出错，使用该插件，跳出输出阶段，防止构建文件夹杂错误代码
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: [`server running here：[ http://${config.dev.host}:${config.dev.port}/pageC.html ]`]
      },
      onErrors: resolveError
    })
  ],
  optimization: {
    runtimeChunk: false,
    minimize: false,
    noEmitOnErrors: true,
    splitChunks: false
  }
};
module.exports = webpackMerge(webpackBase, webpackDev);

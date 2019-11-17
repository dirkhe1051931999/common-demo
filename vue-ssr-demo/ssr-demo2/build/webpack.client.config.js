const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.config.js");
// css样式提取单独文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 服务端渲染用到的插件、默认生成JSON文件(vue-ssr-client-manifest.json)
const VueSSRClientPlugin = require("vue-server-renderer/client-plugin");

module.exports = merge(baseWebpackConfig, {
  mode: "production",
  output: {
    // chunkhash是根据内容生成的hash, 易于缓存,
    // 开发环境不需要生成hash，目前先不考虑开发环境，后面详细介绍
    filename: "static/js/[name].[chunkhash].js",
    chunkFilename: "static/js/[id].[chunkhash].js"
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        // 利用mini-css-extract-plugin提取css, 开发环境也不是必须
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      }
    ]
  },
  devtool: false,
  plugins: [
    // webpack4.0版本以上采用MiniCssExtractPlugin 而不使用extract-text-webpack-plugin
    new MiniCssExtractPlugin({
      filename: "static/css/[name].[contenthash].css",
      chunkFilename: "static/css/[name].[contenthash].css"
    }),
    //  当vendor模块不再改变时, 根据模块的相对路径生成一个四位数的hash作为模块id
    new webpack.HashedModuleIdsPlugin(),
    new VueSSRClientPlugin()
  ]
});

"use strict";

const resolve = require("./utils").resolve;

let config = {
  // 项目目录
  projectPath: resolve("/"),
  // src的目录
  srcPath: resolve("/src/"),
  // 包的目录
  node_modulesPath: resolve("/node_modules/"),
  // 静态文件夹
  assetsSubDirectory: resolve("/src/static/"),
  // 404页面，暂时没用到
  page404: "404.html",
  // 哈希长度
  hashNumber: 6,
  dev: {
    // host
    host: "localhost",
    // 端口
    port: "3000",
    // css的map
    devSourceMap: false,
    // devtool
    devtool: "eval-source-map",
    // 路径
    assetsPublicPath: "/",
    // 代理
    proxyTable: {
      "/api": "http://localhost:9000"
    },
    // 是否开启eslint
    useEslint: false,
    // 是否显示警告信息
    showEslintErrorsInOverlay: true
  },
  build: {
    // 是否开启sourceMap
    prodSourceMap: false,
    // 是否开启gizp
    productionGzip: true,
    // 是否开启包分析
    bundleAnalyzerReport: false,
    // devtool
    devtool: "source-map",
    // 打包的目录
    assetsRoot: resolve("/dist"),
    // 静态资源目录
    assetsPublicPath: "./",
    // 静态文件夹
    copyStaticToPath: resolve("/dist/static/")
  },
  // 在src/pages下要有对应的js文件
  app: {
    pageA: {
      title: "我是pageA",
      description: "我是pageA的description"
    },
    pageB: {
      title: "我是pageB",
      description: "我是pageB的description"
    }
  }
};
console.log("初始化完成");
module.exports = config;

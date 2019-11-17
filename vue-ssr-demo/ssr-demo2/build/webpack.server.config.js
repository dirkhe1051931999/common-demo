const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const nodeExternals = require("webpack-node-externals");
const baseConfig = require("./webpack.base.config");

const VueSSRServerPlugin = require("vue-server-renderer/server-plugin");

module.exports = merge(baseConfig, {
  mode: "production",
  entry: path.resolve(__dirname, "../src/entry-server.js"),
  /*
   允许webpack以Node适用方式(Node-appropriate fashion)处理动态导入(dynamic import)，
   编译vue组件时，告知 vue-loader 输送面向服务器代码
  */
  target: "node",
  devtool: "source-map",
  // 此处告知 server bundle 使用 Node 风格导出模块(Node-style exports)
  output: {
    libraryTarget: "commonjs2",
    filename: "[name].server.js"
  },
  /*
   服务器端也需要编译样式，不能使用 mini-css-extract-plugin 插件
   ，因为该插件会使用document，但是服务器端并没有document, 因此会导致打包报错，我们可以如下的issues:
   https://github.com/webpack-contrib/mini-css-extract-plugin/issues/48#issuecomment-375288454
  */
  module: {
    rules: [
      {
        test: /\.scss?$/,
        use: ["css-loader/locals", "sass-loader"]
      }
    ]
  },
  // https://webpack.js.org/configuration/externals/#function
  // https://github.com/liady/webpack-node-externals
  // 外置化应用程序依赖模块。可以使服务器构建速度更快，
  // 并生成较小的 bundle 文件。
  externals: nodeExternals({
    // 不要外置化 webpack 需要处理的依赖模块。
    // 你可以在这里添加更多的文件类型。例如，未处理 *.vue 原始文件，
    // 你还应该将修改 `global`（例如 polyfill）的依赖模块列入白名单
    whitelist: /\.css$/
  }),

  // 这是将服务器的整个输出
  // 构建为单个 JSON 文件的插件。
  // 默认文件名为 `vue-ssr-server-bundle.json`
  plugins: [
    new webpack.DefinePlugin({
      "process.env.VUE_ENV": '"server"'
    }),
    new VueSSRServerPlugin()
  ]
});

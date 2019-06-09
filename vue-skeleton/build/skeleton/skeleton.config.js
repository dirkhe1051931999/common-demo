const { resolve } = require("path");
const nodeExternals = require("webpack-node-externals");
// webpack中读取bundle对象
const VueSSRServerPlugin = require("vue-server-renderer/server-plugin");
const autoprefixer = require("autoprefixer");
const { VueLoaderPlugin } = require("vue-loader");

// 依赖的文件
const skeletonEntry = resolve(__dirname, "skeleton.entry.js");

module.exports = {
  mode: "production",
  target: "node",
  entry: {
    skeleton: skeletonEntry
  },
  output: {
    path: resolve(__dirname, "."),
    filename: "[name].js",
    libraryTarget: "commonjs2"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader", "postcss-loader"]
      },
      {
        test: /\.less$/,
        use: ["vue-style-loader", "css-loader", "less-loader", "postcss-loader"]
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: "vue-loader",
            options: {
              loaders: {
                scss: ["vue-style-loader", "css-loader", "less-loader"]
              },
              postcss: [autoprefixer()]
            }
          }
        ]
      }
    ]
  },
  // 防止将某些 import 的包打包到 bundle 中，只在运行时从外部获取这些扩展依赖
  externals: nodeExternals({
    whilelist: /\.css$/
  }),
  resolve: {
    extensions: [".js", ".vue", ".json"],
    alias:{
      'components': resolve('src/components'),
    },
  },
  plugins: [
    new VueLoaderPlugin(),
    // 指定输出的json文件名，执行构建过程中，生成了一个skeleton.json文件，
    // 这个文件存储着骨架屏的样式与内容，在创建BundleRenderer 实例，会读取到
    new VueSSRServerPlugin({
      filename: "skeleton.json"
    })
  ]
};

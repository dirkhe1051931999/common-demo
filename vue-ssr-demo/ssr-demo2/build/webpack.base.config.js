const path = require("path");
// vue-loader v15版本需要引入此插件
const VueLoaderPlugin = require("vue-loader/lib/plugin");
// 用于返回文件相对于根目录的绝对路径
const resolve = dir => path.posix.join(__dirname, "..", dir);

module.exports = {
  // 入口暂定客户端入口，服务端配置需要更改它
  entry: path.join(__dirname, "../src/entry-client.js"),
  // 生成文件路径、名字、引入公共路径
  output: {
    path: path.join(__dirname, "../dist"),
    filename: "[name].js",
    publicPath: "/"
  },
  resolve: {
    // 对于.js、.vue引入不需要写后缀
    extensions: [".js", ".vue"]
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          // 配置哪些引入路径按照模块方式查找
          transformAssetUrls: {
            video: ["src", "poster"],
            source: "src",
            img: "src",
            image: "xlink:href"
          }
        }
      },
      {
        test: /\.js$/, // 利用babel-loader编译js，使用更高的特性，排除npm下载的.vue组件
        loader: "babel-loader",
        exclude: file => /node_modules/.test(file) && !/\.vue\.js/.test(file)
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/, // 处理图片
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10000,
              name: "static/img/[name].[hash:7].[ext]"
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/, // 处理字体
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "static/fonts/[name].[hash:7].[ext]"
        }
      }
    ]
  },
  plugins: [new VueLoaderPlugin()]
};

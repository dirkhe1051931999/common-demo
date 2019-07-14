const config = require("./config.js");
const resolve = require("./utils.js").resolve;
const multiplePage = require("./multiple.page");
const { VueLoaderPlugin } = require("vue-loader");
// eslint的一些配置
const ESlintRule = () => ({
  test: /\.(js|vue)$/,
  loader: "eslint-loader",
  // pre是预处理：希望eslint只是审查，不是改变
  enforce: "pre",
  include: [config.srcPath],
  options: {
    formatter: require("eslint-friendly-formatter"),
    // 是否显示警告信息
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
});
console.log("执行构建");
module.exports = {
  // 插入，入口文件，都会从这个路径查找
  context: config.projectPath,
  entry: multiplePage.getEntryPages(),
  resolve: {
    extensions: [".js", ".vue", ".css", ".json", ".less"],
    alias: {
      "@": resolve("/src/"),
      common: resolve("/src/common"),
      components: resolve("/src/components/"),
      router: resolve("/src/router/"),
      static: resolve("/src/static/"),
      views: resolve("/src/views/"),
      store: resolve("/src/store/"),
    }
  },
  module: {
    rules: [
      // 开启了eslint后，是这样的=>[{...}]
      ...(config.dev.useEslint ? [ESlintRule()] : []),
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {}
      },
      {
        test: /\.js$/,
        include: [config.srcPath],
        exclude: [config.assetsSubDirectory],
        use: [
          {
            loader: "babel-loader"
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        include: [config.srcPath],
        exclude: [config.assetsSubDirectory],
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              name: `font/[name].[hash:${config.hashNumber}].[ext]`,
              fallback: "file-loader"
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
            loader: "url-loader",
            options: {
              limit: 8092,
              name: `images/[name].[hash:${config.hashNumber}].[ext]`,
              // 如果小于8k，使用url-loader，大于8k，回退使用file-loader
              fallback: "file-loader"
            }
          }
        ]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 8192,
          name: `media/[name].[hash:${config.hashNumber}].[ext]`,
          fallback: "file-loader"
        }
      }
    ]
  },
  plugins: [new VueLoaderPlugin()]
};

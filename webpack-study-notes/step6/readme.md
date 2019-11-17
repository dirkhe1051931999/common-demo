# webapck 进阶

1. px 转 rem
2. 构建时复制指定的文件到指定文件夹
3. 静态资源内联，css 插入 header 头中
4. 自动清理构建目标产物

## 项目目录

> 参考文件夹目录

## 依赖的包

> 接 step3 文件夹

```bash
# px转rem
npm install --save-dev postcss-px2rem
# 构建时复制指定的文件到指定文件夹
npm install --save-dev copy-webpack-plugin
# 静态资源内联，css插入header头中
npm install --save-dev html-webpack-plugin html-webpack-inline-source-plugin
# 自动清理构建目标产物
npm install --save-dev clean-webpack-plugin'
```

## 执行

```bash
npm install
# 开发环境
npm run step6
```

## package.json

```js
"scripts": {
  "step6": "npx webpack --config webpack.config.js"
}
```

## px 转 rem

> 修改 postcss.config.js

```js
module.exports = {
  plugins: [
    require("postcss-cssnext")({}),
    require("postcss-px2rem")({ remUnit: 75 })
  ]
};
```

## 构建时复制指定的文件到指定文件夹

```js
const CopyWebpackPlugin = require("copy-webpack-plugin");
plugins: [
  new CopyWebpackPlugin([
    {
      // src下的index.html是静态资源，进行复制
      from: path.join(__dirname, "./src/index.html"),
      to: path.join(__dirname, "./bundle/assets")
    }
  ])
];
```

## 静态资源内联，css 插入 header 头中

```js
const HtmlWebpackInlineSourcePlugin = require("html-webpack-inline-source-plugin");
plugins: [
  new htmlWebpackPlugin({
    //压缩模版
    template: path.join(__dirname, "./src/index.html"),
    // 生成的文件名
    filename: "main.html",
    minify: {
      // 去掉html的属性双引号
      removeAttributeQuotes: true,
      // 折叠成一行
      collapseWhitespace: true
    },
    // 内联哪些文件
    inlineSource: /.css$/,
    title: "production"
  }),
  new HtmlWebpackInlineSourcePlugin()
];
```

## 自动清理构建目标产物

```js
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
plugins: [
  new CleanWebpackPlugin({
    root: __dirname,
    verbose: true,
    dry: false
  })
];
```

## webpack.config.js

```js
const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const uglify = require("uglifyjs-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackInlineSourcePlugin = require("html-webpack-inline-source-plugin");
// 通用文件，包含生产和开发的一些基本使用 webpack.common.js
module.exports = {
  mode: "development",
  entry: ["babel-polyfill", path.join(__dirname, "./src/index.js")],
  output: {
    path: path.join(__dirname, "./bundle"),
    filename: "app.[hash:6].js",
    chunkFilename: "[name].bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["babel-loader"],
        include: path.join(__dirname, "src"),
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 1024
            }
          }
        ]
      },
      {
        test: /.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"]
      },
      {
        test: /.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader", // @import 解析
          "postcss-loader",
          "less-loader" // less -->css
        ]
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      //压缩模版
      template: path.join(__dirname, "./src/index.html"),
      // 生成的文件名
      filename: "main.html",
      minify: {
        // 去掉html的属性双引号
        removeAttributeQuotes: true,
        // 折叠成一行
        collapseWhitespace: true
      },
      // 内联哪些文件
      inlineSource: /.css$/,
      title: "production"
    }),
    new HtmlWebpackInlineSourcePlugin(),
    new CleanWebpackPlugin({
      root: __dirname,
      verbose: true,
      dry: false
    }),
    new MiniCssExtractPlugin({
      filename: "index.css"
    }),
    new uglify(),
    new CopyWebpackPlugin([
      {
        // src下的index.html是静态资源，进行复制
        from: path.join(__dirname, "./src/index.html"),
        to: path.join(__dirname, "./bundle/assets")
      }
    ])
  ]
};
```

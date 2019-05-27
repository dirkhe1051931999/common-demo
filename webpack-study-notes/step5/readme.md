# webapck 进阶

1. webpack 的生产配置构建

   > 开发一个项目的时候，经常需要几个环境的切换，比如 dev，production，test 等环境，webpack 推荐使用将公共基本配置放在一起，然后对不同环境环境进行单独配置，通过 webpack-merge 进行配置合并

2. 设置 node 环境变量
   > 根据环境变量值，决定执行哪块代码

## 项目目录

> 参考文件夹目录

## 依赖的包

> 接 step4 文件夹

```bash
# 安装 webpack-merge
npm install --save-dev webpack-merge
# windows下要获取环境变量需要使用一个包插件cross-env
npm install --save-dev cross-env
```

## 执行

```bash
npm install
# 开发环境
npm run dev
# 生产环境
npm run prod
# 开发环境带NODE_ENV
npm run dev-node-env
# 生产环境带NODE_ENV
npm run prod-node-env
```

## package.json

```js
"scripts": {
  "dev-node-env": "npx cross-env NODE_ENV=development webpack --config webpack.common.js",
  "prod-node-env": "npx cross-env NODE_ENV=production webpack --config webpack.common.js",
  "dev": "npx webpack-dev-server --config webpack.dev.js --color",
  "prod": "npx webpack --config webpack.prod.js"
}
```

## webpack.common.js

```js
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const uglify = require('uglifyjs-webpack-plugin');
console.log(process.env.NODE_ENV);
// 通用文件，包含生产和开发的一些基本使用 webpack.common.js
module.exports = {
  mode: 'development',
  entry: ['babel-polyfill', path.join(__dirname, './src/index.js')],
  output: {
    path: path.join(__dirname, './bundle'),
    filename: 'app.js',
    chunkFilename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024
            }
          }
        ]
      },
      {
        test: /.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      },
      {
        test: /.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader', // @import 解析
          'postcss-loader',
          'less-loader' // less -->css
        ]
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      //压缩模版
      template: path.join(__dirname, './src/index.html'),
      // 生成的文件名
      filename: 'main.html',
      minify: {
        // 去掉html的属性双引号
        removeAttributeQuotes: true,
        // 折叠成一行
        collapseWhitespace: true
      },
      title: 'production'
    }),
    new MiniCssExtractPlugin({
      filename: 'index.css'
    }),
    new uglify()
  ]
};
```

## webpack.dev.js

```js
const path = require('path');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
// 开发文件，在通用文件下面进行扩展，合并并替换个性化配置 webpack.dev.js
module.exports = merge(commonConfig, {
  devtool: 'source-map',
  // 服务器配置
  devServer: {
    // 端口号
    port: 3000,
    // 打包进度
    progress: true,
    // 模块热替换
    hot: true,
    // 指定哪个运行目录
    contentBase: path.join(__dirname, 'bundle')
  }
});
```

## webpack.prod.js

```js
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
// 生产文件，在通用文件下进行扩展，合并并替换个性化配置，webpack.prod.js
module.exports = merge(commonConfig, {
  optimization: {
    splitChunks: {
      cacheGroups: {
        verdor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
  }
});
```

## 参考

https://juejin.im/post/5aefc770f265da0b9c108c40#heading-3

https://www.cnblogs.com/liuchuanfeng/p/6802635.html

https://www.jianshu.com/p/777f1a044e3c

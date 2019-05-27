# 处理 less 文件

## 项目目录

> 参考文件夹目录

## 依赖的包

> 接 step1 文件夹

```bash
# css-loader让你能import css、style-loader能将css以style的形式插入
npm install --save-dev css-loader style-loader
# less相关
npm install --save-dev less less-loader
# 安装 postcss 和 postcss-cssnext 添加浏览器前缀
npm install --save-dev postcss-loader postcss-cssnext
# 转译一些特殊的语法：Promise/Object.assign/Array.from
npm install --save-dev babel-polyfill babel-plugin-transform-runtime
```

## postcss.config.js

```js
module.exports = {
  plugins: {
    'postcss-cssnext': {}
  }
}
```

## webpack.config.js

```js
const path = require('path')
module.exports = {
  mode: 'development',
  entry: ['babel-polyfill', path.join(__dirname, './src/index.js')],
  output: {
    path: path.join(__dirname, './bundle'),
    filename: 'bundle.js'
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
        test: /.less$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
      },
      {
        test: /.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
      }
    ]
  }
}
```

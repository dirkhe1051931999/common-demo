# 处理 js 文件

## 项目目录

> 参考文件夹目录

## 依赖的包

```bash
# webpack
npm install --save-dev webpack webpack-cli
# babel7
npm install --save-dev babel-loader@7 babel-core
# 转译es6
npm install --save-dev babel-preset-env
# 转译一些特殊的语法：Promise/Object.assign/Array.from
npm install --save-dev babel-polyfill babel-plugin-transform-runtime
```

## .babelrc

```txt
{
    "presets": [
        "env"
    ],
    "plugins": [
       "transform-runtime"
    ]
}
```

## webpack.config.js

```js
const path = require('path')
module.exports = {
  // 模式，默认两种 production development
  mode: 'development',
  // 入口
  entry: ['babel-polyfill', path.join(__dirname, './src/index.js')],
  // 出口
  output: {
    path: path.join(__dirname, './bundle'),
    filename: 'bundle.js'
  },
  // 模块
  module: {
    // 规则
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/
      }
    ]
  }
}
```

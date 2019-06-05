# webpack 学习笔记

> 记录 webpack 的学习笔记

## <span id="1">基本配置</span>

1. 处理 js 文件
   > 对应文件夹 [step1](./step1)
2. 处理 less 文件
   > 对应文件夹 [step2](./step2)
3. 插件、提取公共 js 和编译图片
   > 对应文件夹 [step3](./step3)
4. webapck-dev-server 服务
   > 对应文件夹 [step4](./step4)

## <span id="2">深入配置</span>

- day-01

1. webpack 的生产配置构建
2. 设置 node 环境变量
   > 对应文件夹 [step5](./step5)

- day-02

1. px 转 rem
2. 构建时复制指定的文件到指定文件夹
3. 静态资源内联，css 插入 header 头中
4. 自动清理构建目标产物
   > 对应文件夹 [step6](./step6)

## <span id="3">优化</span>

- `noPath 和 exclude/include`

```txt
使用 noParse 忽略不会依赖的文件，比如项目引入一个jquery
使用 exclude 和 include做限制配置优化
module: {
  // 不去解析jquery的的依赖关系
  noParse: /jquery/,
  rules: [
    {
      test: /\.js/,
      exclude: /node_modules/,
      include: path.resolve(__dirname, 'src'),
      use: {
        loader: 'babel-loader',
      }
    }
  ]
}
```

- [生产环境开启 tree shaking(webpack 自带优化功能)](./step7)
- [动态链路库](./step9)
- `scope hosting(webpack 自带优化功能)`
  1. scope hoisting(作用域提升)的`作用`：优化函数声明，减少函数作用域
  2. scope hoisting(作用域提升)的`好处`：减少内存开销，减少代码体积
  3. scope hoisting(作用域提升)的`原理`：分析模块之间的依赖关系，尽可能的将打散的代码模块合并到同一个作用域中
  4. scope hoisting(作用域提升)的`前提`：使用 ES6 模块化语言（import）

```js
// .babelrc
{
  "presets": [
    [
      "env",
      {
        "modules": false
      }
    ]
  ],
  "plugins": ["transform-runtime"]
}

```

```js
// webpack.config.js
const path = require('path');
const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin');
module.exports = {
  mode: 'production',
  entry: ['babel-polyfill', path.join(__dirname, './src/main.js')],
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
      }
    ]
  },
  resolve: {
    mainFields: ['jsnext:main', 'browser', 'main']
  },
  plugins: [new ModuleConcatenationPlugin()]
};
```

## <span id="4">进阶</span>

1. [webpack4 多页面打包](https://github.com/dirkhe1051931999/common-demo/tree/master/webpack-multiPage)
2. [webapck 进阶：移动端适配](./step8)

## 参考

> [Webpack 4 使用指南](https://juejin.im/post/5ad1ef5d518825556534f137#heading-21)

> [Webpack 文档](https://www.webpackjs.com/configuration/)

> [一个从基础配置到 webpack 的实现、loader 的编写、plugin 的编写的笔记](https://github.com/naihe138/webpack-notes)

# webpack4 多页面

## 多页面入口

> webpack3.1 以上可以为每一个页面(html)写一份配置，构建出多入口文件

## 适用场景

1. H5 页面/H5 活动页
2. 多页面应用
3. ...

## 实现功能

1. 多页面入口
2. 生产环境和开发环境互相独立
3. HRM
4. HTML/JS/CSS/LESS 代码打包构建
5. webpack-dev-server
6. 静态文件管理
7. 自动清理构建目标产物
8. 移动端 css px 自动转成 rem
9. eslint 语法检测
10. 解析图片，ttf，MP4 等媒体文件
11. 支持 ES6/7/8
12. 生产环境 splitChunks
13. 自动补齐 css3 前缀
14. webpack 性能优化，例如编译时出现错误时，使用跳过编译阶段、防止出现错误代码混入，压缩代码时使用多进程并行运行和文件缓存来提高构建速度
15. 友好的输出打包日志
16. babel:转译一些特殊的语法：Promise/Object.assign/Array.from

## 技术栈

1. webpack4
2. babel
3. less/css(不支持 sass/stylus)
4. eslint

## 环境

1. webpack v4.19.1
2. nodejs v10.15.3
3. npm v6.4.1

## srcipts

```bash
# 安装依赖
npm install
# 开启开发环境
npm run dev
# 开启生产环境
npm run build
# 开始eslint校验
npm run lint
```

## 配置文件

### postcss.config.js

```js
module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-url': {},
    // css3前缀
    autoprefixer: {
      browsers: ['defaults', 'not ie < 11', 'last 2 versions', '> 1%', 'iOS 7', 'last 3 iOS versions']
    },
    // px转rem
    'postcss-px2rem': { remUnit: 75 }
  }
};
```

### .eslintrc.js

```js
module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    semi: 2
  }
};
```

### .babelrc

```js
{
  "presets": ["env"],
  "plugins": ["transform-runtime"]
}

```

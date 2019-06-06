# webapck 进阶：移动端适配

1. px 转 vw
2. 1px 问题
3. vw 的局限

## 依赖的包

```bash
# px转vw
npm install --save-dev postcss-px-to-viewport
# 解决1px问题
npm install --save-dev postcss-write-svg
# 低版本手机兼容vw方案
npm install --save-dev postcss-viewport-units
```

## px 转 vw

> vw：viewport width（可视窗口宽度），当前页面是 750 页面，1vw 相当于视图的 1% 7.5px

```css
/* 一个按钮宽度为220px，以750屏为例*/
button {
  /* 220/7.5vw= 29.3333*/
  width: 29.3333vw;
}
```

- 解决方法

> 使用[postcss-px-to-viewport](https://github.com/evrone/postcss-px-to-viewport)，在构建的时候自动转成 vw

## 1px 问题

> 1px 产生的原因：预期 1px 在屏幕上应该显示一个像素点，但是在 Retina 上却不是，iphone6/iphone5 的 dpr(devicePixelRadio：设备像素比）为 2，css 写的 1px 会显示成 2px，同理 dpr 为 3 的 iphone6s/iphoneX 系列，会把 1px 显示成 3px

- 解决方法

1. 根据 dpr 动态计算 initial-scale，可以有效解决 1px 问题，具体细节：根据 dpr 重写 viewport meta 头的 initial-scale

```js
window.onload = function() {
  var dpr = parseInt(window.devicePixelRatio || 1);
  var scale = 1 / dpr;
  document.documentElement.setAttribute('data-dpr', dpr);
  var content = 'width=device-width, initial-scale=' + scale + ', minimum-scale=' + scale + ', maximum-scale=' + scale + ', user-scalable=no';
  var viewportEl = document.querySelector('meta[name="viewport"]');
  viewportEl.setAttribute('content', content);
};
```

2. 使用[postcss-write-svg](https://github.com/jonathantneal/postcss-write-svg)：使用 border-image 配置 svg 绘制矢量图处理 1px 问题

```css
@svg 1px-border {
  width: 4px;
  height: 4px;
  @rect {
    fill: transparent;
    width: 100%;
    height: 100%;
    stroke-width: 25%;
    stroke: var(--color);
  }
}
#real-1px {
  border: 0;
  border-top: 1px solid;
  border-image: svg(1px-border param(--color red)) 1 stretch;
}
```

3. 使用 transform:scale 进行缩放

```css
div {
  width: 50%;
  height: 50px;
  margin: 0 auto;
  margin-top: 10px;
  position: relative;
  font-size: 20px;
}
div::after {
  position: absolute;
  bottom: 0;
  content: '';
  width: 100%;
  border-top: solid 1px #000;
}
@media screen and (-webkit-min-device-pixel-radio: 2) {
  div::after {
    transform: scaleY(1/2);
  }
}
@media screen and (-webkit-min-device-pixel-radio: 3) {
  div::after {
    transform: scaleY(1/3);
  }
}
```

## vw 的局限

> vw 在 Android 4.4 之下和 iOS8 以下的版本兼容性都存有一定的问题，可以使用[viewport-units-buggyfill](https://github.com/rodneyrehm/viewport-units-buggyfill)兼容，原理是给 viewport 添加对应的 hack 代码

```css
div {
  color: lightcoral;
  background: url('./check.png');
  padding: 1px 1.3333vw 13.3333vw;
  left: 50%;
  vertical-align: 0.6667vw;
  content: 'viewport-units-buggyfill; padding: 1px 1.3333vw 13.3333vw; vertical-align: 0.6667vw';
}
```

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/viewport-units-buggyfill/0.6.2/viewport-units-buggyfill.hacks.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/viewport-units-buggyfill/0.6.2/viewport-units-buggyfill.min.js"></script>
<script>
  window.onload = function() {
    window.viewportUnitsBuggyfill.init({
      hacks: window.viewportUnitsBuggyfillHacks
    });
  };
</script>
```

> 如果每次手动都添加 hack 代码，岂不是很崩溃，可以使用[postcss-viewport-units](https://github.com/springuper/postcss-viewport-units)自动添加 vw 的 hack 代码，但这种方法存在问题，postcss-viewport-units 会覆盖伪类的 content 属性，如果一定要用伪类的 content，记着加!important

## postcss.config.js

```js
module.exports = {
  plugins: [
    // css3前缀
    require('postcss-cssnext')({}),
    // 解决1px问题
    require('postcss-write-svg')({
      // svg转base64
      utf8: false
    }),
    // px转vw
    require('postcss-px-to-viewport')({
      // 要转换的单位
      unitToConvert: 'px',
      // 视觉稿宽度
      viewportWidth: 750,
      // 哪些属性转
      propList: ['*'],
      // 保留位数
      unitPrecision: 4,
      // 转换成vw
      viewportUnit: 'vw',
      // 指定不转换为视窗单位的类
      selectorBlackList: ['.ignore'],
      // 最小的转换单位
      minPixelValue: 1,
      // 是否允许在媒体查询中转换px，一般不允许
      mediaQuery: false,
      // 忽略转换的文件夹
      exclude: /node_modules/
    }),
    // 自动添加vw的hack代码
    require('postcss-viewport-units')({})
  ]
};
```

## webpack.config.js

```js
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const uglify = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// 通用文件，包含生产和开发的一些基本使用 webpack.common.js
module.exports = {
  mode: 'development',
  entry: ['babel-polyfill', path.join(__dirname, './src/index.js')],
  output: {
    path: path.join(__dirname, './bundle'),
    filename: 'app.[hash:6].js',
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
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader', 'postcss-loader']
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
      // 内联哪些文件
      inlineSource: /.css$/,
      title: 'production'
    }),
    new CleanWebpackPlugin({
      root: __dirname,
      verbose: true,
      dry: false
    }),
    new MiniCssExtractPlugin({
      filename: 'index.css'
    }),
    new uglify()
  ]
};
```

## 1px 的 demo

> 在 less 中写@svg 时，webpack rules 中解析.less 的 loader 最后一个必须是 `postcss-loader`，因为 loader 的执行是从右往左的。

## 参考

> [分享手淘过年项目中采用到的前端技术-大漠](https://www.itcodemonkey.com/article/2464.html)

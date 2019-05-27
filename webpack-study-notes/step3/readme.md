# 插件、提取公共 js 和编译图片

1. 生成 html 插件
2. 生成 css 插件
3. 清理打包文件插件
4. 代码压缩插件
5. 提取公共 js

## 项目目录

> 参考文件夹目录

## 依赖的包

> 接 step2 文件夹

```bash
# 生成HTML插件
npm install --save-dev html-webpack-plugin
# 生成CSS插件
npm install --save-dev mini-css-extract-plugin
# 清理打包文件插件
npm install --save-dev clean-webpack-plugin
# 代码压缩件插件
npm install --save-dev uglifyjs-webpack-plugin
# 编译图片
npm install --save-dev url-loader file-loader
```

## 执行

```bash
npm install
npm run step3
```

## 生成 HTML 插件

```js
const htmlWebpackPlugin = require('html-webpack-plugin');
plugins: [
  new htmlWebpackPlugin({
    filename: 'index.html',
    template: path.join(__dirname, './src/index.html')
  })
];
```

## 生成 CSS 插件

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module: {
  rules: [
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
  ];
}
plugins: [
  new MiniCssExtractPlugin({
    filename: 'index.css'
  })
];
```

## 清理打包文件插件

```js
const CleanWebpackPlugin = require('clean-webpack-plugin');
plugins: [
  new CleanWebpackPlugin({
    root: __dirname,
    verbose: true,
    dry: false
  })
];
```

## 代码压缩件插件

```js
const uglify = require('uglifyjs-webpack-plugin');
plugins: [new uglify()];
```

## 提取公共 js

```js
output: {
  chunkFilename: '[name].[chunkhash:8].js'
},
optimization: {
  splitChunks: {
    cacheGroups: {
      verdor: {
        test: /[\\/]node_modules[\\/]/,
        name: 'common',
        chunks: 'all'
      }
    }
  }
}
```

## 编译图片

```js
module: {
  rules: [
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
    }
  ];
}
```

## webpack.config.js

```js
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const uglify = require('uglifyjs-webpack-plugin');
module.exports = {
  mode: 'development',
  entry: ['babel-polyfill', path.join(__dirname, './src/index.js')],
  output: {
    path: path.join(__dirname, './bundle'),
    filename: 'bundle.js',
    chunkFilename: '[name].[chunkhash:8].js'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        verdor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'common',
          chunks: 'all'
        }
      }
    }
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
      filename: 'index.html',
      template: path.join(__dirname, './src/index.html')
    }),
    new MiniCssExtractPlugin({
      filename: 'index.css'
    }),
    new CleanWebpackPlugin({
      root: __dirname,
      verbose: true,
      dry: false
    }),
    new uglify()
  ]
};
```

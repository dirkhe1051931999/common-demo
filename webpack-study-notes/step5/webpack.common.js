const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const uglify = require('uglifyjs-webpack-plugin')
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
    rules: [{
        test: /\.js$/,
        use: ['babel-loader'],
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 1024
          }
        }]
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
      title: "production"
    }),
    new MiniCssExtractPlugin({
      filename: 'index.css'
    }),
    new uglify()
  ]
}
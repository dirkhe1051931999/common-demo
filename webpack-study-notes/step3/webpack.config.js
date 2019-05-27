const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const uglify = require('uglifyjs-webpack-plugin')
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
}

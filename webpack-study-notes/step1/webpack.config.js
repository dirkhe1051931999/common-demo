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
      }
    ]
  }
}

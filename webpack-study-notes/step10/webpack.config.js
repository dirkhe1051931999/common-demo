const path = require("path");
module.exports = {
  mode: "development",
  entry: ["babel-polyfill", path.join(__dirname, "./src/index.js")],
  output: {
    path: path.join(__dirname, "./bundle"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["babel-loader"],
        include: path.join(__dirname, "src"),
        exclude: /node_modules/
      },
      {
        test: /\.txt$/,
        use: {
          loader: path.resolve(__dirname, "./test-loader.js"),
          options: {
            loader: "test-loader"
          }
        }
      }
    ]
  }
};

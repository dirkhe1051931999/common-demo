"use strict";

const path = require("path");
const packageConfig = require("../package.json");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  resolve: function(dir) {
    return path.join(__dirname, "..", dir);
  },
  createNotifierCallback: function() {
    const notifier = require("node-notifier");
    return (severity, errors) => {
      if (severity !== "error") return;
      const error = errors[0];
      const filename = error.file && error.file.split("!").pop();
      notifier.notify({
        title: packageConfig.name,
        message: severity + ": " + error.name,
        subtitle: filename || ""
      });
    };
  },
  styleLoaders: function(options) {
    options = options || {};
    var cssLoader = {
      loader: "css-loader",
      options: {
        sourceMap: options.sourceMap
      }
    };

    function getCssRule(extension, loader, loaderOptions) {
      var use = ["vue-style-loader", cssLoader];
      use.push(getPostCssLoader(options.sourceMap));
      if (loader) {
        use.push({
          loader: loader + "-loader",
          options: Object.assign({}, loaderOptions, { sourceMap: options.sourceMap })
        });
      }
      if (options.extract) {
        use.splice(1, 0, {
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: "../" // dist/css 相对于 dist 根目录
          }
        });
      }
      const config = require("./config.js");
      return {
        test: new RegExp("\\." + extension + "$"),
        include: [config.srcPath],
        exclude: [config.assetsSubDirectory],
        use: use
      };
    }

    var result = [getCssRule("css", false), getCssRule("postcss", false), getCssRule("less", "less"), getCssRule("sass", "sass", { indentedSyntax: true }), getCssRule("scss", "sass"), getCssRule("stylus", "stylus"), getCssRule("styl", "stylus")];

    return result;
  }
};
function getPostCssLoader(sourceMap) {
  return {
    loader: "postcss-loader",
    options: {
      sourceMap: sourceMap
    }
  };
}

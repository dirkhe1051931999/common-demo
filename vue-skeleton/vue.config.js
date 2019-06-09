const { resolve } = require("path");
module.exports = {
  chainWebpack: (config) => {
    config.resolve.alias.set("components", resolve("src/components")).set("views", resolve("src/views"));
  }
};

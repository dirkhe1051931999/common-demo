const createBundleRenderer = require("vue-server-renderer")
  .createBundleRenderer;
// 绝对文件路径
let renderer = createBundleRenderer("./package.json");

console.log(renderer);

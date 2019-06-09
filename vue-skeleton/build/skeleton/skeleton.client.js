const fs = require("fs");
const { resolve } = require("path");
const htmlMinifier = require("html-minifier");
const chalk = require("chalk");

// 创建一个 renderer 实例
const { createBundleRenderer } = require("vue-server-renderer");

// 依赖的文件
const publicHtml = resolve(__dirname, "../../public/index.html");
const skeletonJson = resolve(__dirname, "./skeleton.json");
const skeletonTemplate = resolve(__dirname, "./skeleton.template.html");

// https://ssr.vuejs.org/zh/api/#createrenderer
// 创建一个 BundleRenderer 实例
const renderer = createBundleRenderer(skeletonJson, {
  template: fs.readFileSync(skeletonTemplate, "utf-8")
});
renderer.renderToString({}, (err, html) => {
  // 压缩html
  html = htmlMinifier.minify(html, {
    collapseInlineTagWhitespace: true,
    minifyCSS: true
  });
  // 重写public/index.html
  fs.writeFileSync(publicHtml, html, "utf-8");
  if (err) {
    console.log(chalk.red("骨架屏生成失败！错误：" + err));
    process.exit(1);
  }
  console.log(chalk.green("骨架屏生成成功！"));
});

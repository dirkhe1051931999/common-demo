"use strict";
const webpack = require("webpack");
const chalk = require("chalk");
const webpackSkeletonConfig = require("./skeleton.config.js");

webpack(webpackSkeletonConfig, function(err, stats) {
  if (err) throw err;
  // http://javascript.ruanyifeng.com/nodejs/process.html
  // 等同于console.log，可用在标准输出向用户显示内容
  process.stdout.write(
    // 控制输出内容，不现实modules，chunks等
    stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + "\n"
  );

  if (stats.hasErrors()) {
    console.error(chalk.magenta("skeleton.json生成失败！错误：", err));
    process.exit(1);
  }
  console.log(chalk.green("skeleton.json生成成功！"));
});

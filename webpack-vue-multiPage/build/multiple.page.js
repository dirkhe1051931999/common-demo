const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
let appConfig = require("./config").app;

let pageList = null;
let isBuild = ["production"].includes(process.env.NODE_ENV);

function readPages() {
  if (!pageList) {
    const pagesPath = path.resolve("./src/pages");
    pageList = [];
    fs.readdirSync(pagesPath).forEach((pageFile) => {
      let fullPath = pagesPath + "/" + pageFile;
      let isDir = fs.statSync(fullPath).isDirectory();
      // 如果pages下的文件是一个js文件，js文件会被重写成html文件
      if (!isDir) {
        if (pageFile.slice(-3) === ".js") {
          let baseName = pageFile.slice(0, pageFile.lastIndexOf("."));
          pageList.push({
            entry: fullPath,
            chunkName: baseName,
            template: "index.html"
          });
        }
      } else {
        // 如果pages下的文件是文件夹，该文件夹可自定义模版
        try {
          pageList.push({
            entry: fullPath + "/entry.js",
            // 提取出用 '/' 隔开的path的最后一部分
            // path.basename('/a/b/c/d/index.js')  ==>index.js
            chunkName: path.basename(pageFile),
            template: fullPath + "/index.html"
          });
        } catch (err) {
          console.error(fullPath + "/entry.js not found. \n", err);
        }
      }
    });
  }
  return pageList;
}

exports.getEntryPages = function() {
  let pages = readPages().reduce((r, page) => {
    r[page.chunkName] = page.entry;
    return r;
  }, {});
  console.log("正在获取入口文件");
  return pages;
};

exports.htmlPlugins = function() {
  let exChunks = isBuild ? ["manifest", "vendor"] : [];
  let list = readPages().map((page) => {
    let options = {
      filename: page.chunkName + ".html",
      template: page.template,
      title: appConfig[page.chunkName] ? appConfig[page.chunkName].title : "",
      chunks: [...exChunks, page.chunkName],
      inject: true,
      minify: {
        removeComments: isBuild ? true : false,
        collapseWhitespace: isBuild ? true : false,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      appConfig: appConfig[page.chunkName] || { title: "", description: "" }
    };
    return new HtmlWebpackPlugin(options);
  });
  console.log("正在生成HTML");
  return list;
};

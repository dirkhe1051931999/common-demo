'use strict'
const co = require('co');
const prompt = require('co-prompt');
const fs = require('fs');

const {
  templatesUrl
} = require("../config")
console.log(templatesUrl)
const table = require('../table');
const tip = require('../tip');
const templates = require(templatesUrl);

// fs.writeFile的回调函数
const writeFile = (err) => {
  if (err) {
    console.log(err);
    tip.fail('请重新运行!');
    process.exit();
  }
  table(templates);
  tip.suc('新模板添加成功!');
  process.exit();
};

// 把模板信息写入templates.json
const resolve = (result) => {
  const {
    tplName,
    gitUrl,
    branch,
    description,
  } = result;
  // 判断git链接是否合法
  if (gitUrl.slice(-4) !== '.git') {
    tip.fail('Git 链接不合法');
    process.exit();
  }
  // 避免重复添加
  if (!templates[tplName]) {
    templates[tplName] = {};
    templates[tplName]['url'] = gitUrl.replace(/[\u0000-\u0019]/g, ''); // 过滤unicode字符
    templates[tplName]['branch'] = branch;
    templates[tplName]['description'] = description;
  } else {
    tip.fail('模板已经存在!');
    process.exit();
  };
  fs.writeFile(__dirname + '/' + templatesUrl, JSON.stringify(templates), 'utf-8', writeFile);
};
// 分步接收用户输入的参数
let add = () => {
  co(function* () {
    const tplName = yield prompt('模板名字: ');
    const gitUrl = yield prompt('Git 链接: ');
    const branch = yield prompt('Git 分支: ');
    const description = yield prompt('模板描述: ');
    return new Promise((resolve, reject) => {
      resolve({
        tplName,
        gitUrl,
        branch,
        description,
      });
    });
  }).then(resolve);
}
module.exports = add
'use strict'
const co = require('co');
const prompt = require('co-prompt');
const fs = require('fs');

const {
  templatesUrl
} = require("../config")
const table = require('../table');
const tip = require('../tip');
const templates = require(templatesUrl);

// fs.writeFile回调函数
const writeFile = (err) => {
  if (err) {
    console.log(err);
    tip.fail('请重新运行!');
    process.exit();
  }
  tip.suc('新模板删除成功!');
  if (JSON.stringify(templates) !== '{}') {
    table(templates);
  } else {
    tip.info('还未添加模板!');
  }
  process.exit();
};
// 写入template.json
const resolve = (tplName) => {
  // 删除对应的模板
  if (templates[tplName]) {
    delete templates[tplName];
  } else {
    tip.fail('暂无模板!');
    process.exit();
  }
  fs.writeFile(`${__dirname}\${templatesUrl}`, JSON.stringify(templates), 'utf-8', writeFile);
};
// 分步接收用户输入的参数
let _delete = () => {
  co(function* () {
    const tplName = yield prompt('模板名字: ');
    return new Promise((resolve, reject) => {
      resolve(tplName);
    });
  }).then(resolve);
}
module.exports = _delete
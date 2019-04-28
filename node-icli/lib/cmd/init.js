'use strict'
// 操作命令行
const exec = require('child_process').exec;
const co = require('co');
const ora = require('ora');
const prompt = require('co-prompt');
const fs = require("fs");
const path = require("path");

const {
  templatesUrl
} = require("../config")
const tip = require('../tip');
const templates = require(templatesUrl);
const spinner = ora('正在生成...');

// 删除 git 文件后的回调函数
const execRm = (err, projectName) => {
  spinner.stop();
  if (err) {
    console.log(err);
    tip.fail('请重新运行!');
    process.exit();
  }
  tip.suc('初始化完成！');
  tip.info(`cd ${projectName} && npm install`);
  process.exit();
};
// 远程拉取git指定分支下的指定项目的回调函数
const download = (err, projectName) => {
  if (err) {
    console.log(err);
    tip.fail('请重新运行!');
    process.exit();
  }
  // 删除 git 文件
  exec('cd ' + projectName + ' && rm -rf .git', (err, out) => {
    execRm(err, projectName);
  });
}
// 删除指定文件夹
function delDir(path) {
  let files = [];
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path);
    files.forEach((file, index) => {
      let curPath = path + "/" + file;
      if (fs.statSync(curPath).isDirectory()) {
        delDir(curPath); //递归删除文件夹
      } else {
        fs.unlinkSync(curPath); //删除文件
      }
    });
    fs.rmdirSync(path);
  }
}
// 远程拉取git指定分支下的指定项目
const resolve = (result) => {
  const {
    tplName,
    url,
    branch,
    projectName,
  } = result;
  let cwd = process.cwd() + "/" + projectName;
  delDir(cwd)
  const cmdStr = `git clone ${url} ${projectName} && cd ${projectName} && git checkout ${branch}`;
  spinner.start();
  exec(cmdStr, (err) => {
    download(err, projectName);
  });
};
// 分步接收用户输入的参数
let init = async () => {
  co(function* () {
    const tplName = yield prompt('模板名字: ');
    const projectName = yield prompt('项目名字: ');
    if (!templates[tplName]) {
      tip.fail('模板不存在!');
      process.exit();
    }
    return new Promise((resolve, reject) => {
      resolve({
        tplName,
        projectName,
        ...templates[tplName],
      });
    });
  }).then(resolve);
}
module.exports = init
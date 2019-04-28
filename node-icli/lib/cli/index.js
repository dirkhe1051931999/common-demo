'use strict';
const program = require('commander');
const packageInfo = require('../../package.json');

// 版本
program
  .version(packageInfo.version)

// init初始化项目的命令
program
  .command('init')
  .description('初始化项目')
  // 简写
  .alias('i')
  .action(() => {
    require('../cmd/init')();
  });
// add添加一个模板的命令
program
  .command('add')
  .description('添加一个新模板')
  // 简写
  .alias('a')
  .action(() => {
    require('../cmd/add')();
  });
// list查看模板列表的命令
program
  .command('list')
  // 简写
  .description('查看模板列表')
  .alias('l')
  .action(() => {
    require('../cmd/list')();
  });
// delete删除一个模板的命令
program
  .command('delete')
  .description('删除模板')
  // 简写
  .alias('d')
  .action(() => {
    require('../cmd/delete')();
  });
program.parse(process.argv);
// 如果没有输出命令，那输入执行器会有提示帮助说明
if (!program.args.length) {
  program.help()
}
const Table = require('cli-table');
const tip = require('./tip');

const template = new Table({
  head: ['name', 'description', ],
  style: {
    head: ['cyan']
  }
});

let table = (config) => {
  // 获取config key值
  const keys = Object.keys(config);
  if (!keys.length) {
    tip.fail('暂无模板!');
    return
  }
  // 遍历keys
  keys.forEach((key) => {
    template.push(
      [`${key}`, config[key].description]
    );
  });
  const list = template.toString();
  if (!list) {
    tip.fail('暂无模板!');
    return
  }
  // 将template转成字符串并打印出来
  tip.info('模板列表是: ')
  console.log(`${list}\n`);
}
module.exports = table
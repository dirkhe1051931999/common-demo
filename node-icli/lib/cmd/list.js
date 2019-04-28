'use strict'
const table = require('../table');
// 执行list命令
let list = () => {
  table(require('../../templates'));
  process.exit();
}
module.exports = list
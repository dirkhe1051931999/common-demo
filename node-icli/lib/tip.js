const chalk = require('chalk');

const tip = {
  suc: (msg) => console.log(chalk.green.bold(`\n success: ${msg}\n`)),
  fail: (msg) => console.log(chalk.red.bold(`\n fail: ${msg}\n`)),
  info: (msg) => console.log(chalk.blue(`\n warn: ${msg}\n`))
}
module.exports = tip
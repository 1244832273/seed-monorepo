/*
 * @Author: 鲁田文
 * @Date: 2022-06-10 18:19:16
 * @LastEditTime: 2022-06-13 14:41:49
 * @LastEditors: 鲁田文
 * @Description: 控制台输出log
 */
const chalk = require('chalk');

class Logger {
  // 成功提示
  success(info) {
    console.log(chalk.green(JSON.stringify(info, null, 4)));
  }

  // 警告提示
  warn(info) {
    console.log(chalk.yellow(JSON.stringify(info, null, 4)));
  }

  // 错误提示
  err(info) {
    console.log(chalk.red(JSON.stringify(info, null, 4)));
  }

  // 信息提示
  info(info) {
    console.log(chalk.blue(JSON.stringify(info, null, 4)));
  }
}

module.exports = Logger;

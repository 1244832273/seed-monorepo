/*
 * @Author: 鲁田文
 * @Date: 2022-06-10 18:19:16
 * @LastEditTime: 2023-03-20 15:20:22
 * @LastEditors: 鲁田文
 * @Description: 控制台输出log
 */
const chalk = require('chalk');

class Logger {
  // 成功提示
  success(message) {
    console.log(chalk.green(JSON.stringify(message, null, 4)));
  }

  // 警告提示
  warn(message) {
    console.log(chalk.yellow(JSON.stringify(message, null, 4)));
  }

  // 错误提示
  err(message) {
    console.log(chalk.red(JSON.stringify(message, null, 4)));
  }

  // 信息提示
  message(message) {
    console.log(chalk.blue(JSON.stringify(message, null, 4)));
  }

  /**
   * @description: 异常并触发进程退出
   * @param {*} message
   * @return {*}
   */
  fatal(message) {
    this.err(message);

    process.exit(1);
  }
}

module.exports = Logger;

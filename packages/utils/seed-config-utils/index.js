const path = require('path');
const fs = require('fs');
const { logger } = require('@seedltw/message-utils');

class SeedConfigUtils {
  constructor(configPath = './seed.config.js', packagePath = './package.json') {
    this.configPath = path.resolve(configPath);
    this.packagePath = path.resolve(packagePath);
    this.configFile = null;
    this.packageFile = null;
  }

  initConfig() {
    this.configFile = this.loadConfigFile(); // 加载seed.config文件
    this.packageFile = this.loadPackageFile(); // 加载package.json文件

    return this;
  }

  /**
   * @description: 判断是否存在配置或依赖文件
   * @return {string}
   */
  haveFile(filePath) {
    let isFile = false;
    try {
      const stat = fs.statSync(filePath);
      isFile = stat.isFile();
    } catch (error) {
      logger.fatal(`haveFile err: ${error}`);
    }

    if (isFile) {
      return filePath;
    } else {
      logger.fatal(`not find ${filePath}`);
    }
  }

  /**
   * @description: 加载配置文件
   * @return {*}
   */
  loadConfigFile() {
    const filePath = this.haveFile(this.configPath);

    let configFile = {};
    try {
      configFile = require(filePath);
    } catch (error) {
      logger.fatal(`loadConfigFile err: ${error}`);
    }

    return configFile;
  }

  /**
   * @description: 加载package文件
   * @return {*}
   */
  loadPackageFile() {
    const filePath = this.haveFile(this.packagePath);

    let configFile = {};
    try {
      configFile = require(filePath);
    } catch (error) {
      logger.fatal(`loadPackageFile err: ${error}`);
    }

    return configFile;
  }
}

module.exports = SeedConfigUtils;

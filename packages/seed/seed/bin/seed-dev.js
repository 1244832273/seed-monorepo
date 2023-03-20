#!/usr/bin/env node
const program = require('commander');
const seedWebpackDev = require('@seedltw/seed-webpack-dev');
const { logger } = require('@seedltw/message-utils');
const SeedConfigUtils = require('@seedltw/seed-config-utils');

function startServe() {
  // 读取seed.config文件 和package.json文件
  const seedConfig = new SeedConfigUtils().initConfig();
  const { devServer, ...otherConfig } = seedConfig.configFile;

  if (!devServer) {
    logger.fatal('未找到seed.config下的devServer配置!');
  }
  // webpackdevServer没有domain属性需要抽离
  const { domain, ...otherDevServer } = devServer;

  let options = {
    configFile: otherConfig,
    devServer: otherDevServer,
    packageFile: seedConfig.packageFile,
  };

  if (devServer?.https) {
    //
  } else {
    logger.message('seed.config下的devServer.https配置为false');
  }

  seedWebpackDev(options.configFile, options);
}

startServe();

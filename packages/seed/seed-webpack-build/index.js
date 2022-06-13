// 环境变量配置
process.env.NODE_ENV = 'production';
process.env.SEED_ENV = 'production';

const path = require('path');

const getWebpackConfig = require('@seedltw/webpack-config');
const { logger } = require('@seedltw/message-utils');

const prodConfig = {
  mode: 'production',
  output: {
    clean: true, // 在生成文件之前清空 output 目录
    filename: '[name].[contenthash].js', // 输出文件名
    path: path.join(process.cwd(), 'dist'), // 输出文件目录
  },
};

// todo 有时间优化下这块编译时的打印
// 打印信息 编译错误（缺失的 module，语法错误等） 编译警告
function printStats(stats) {
  // 有错误打印官方返回 免得麻烦
  if (stats.hasErrors() || stats.hasWarnings()) {
    return console.log(
      stats.toString({
        chunks: false, // 使构建过程更静默无输出
        colors: true, // 在控制台展示颜色
      }),
    );
  }

  const statsData = stats.toJson('minimal');
  logger.info(statsData);
  // 打印 version用来编译的 webpack 版本 time编译时间（毫秒）errorsCount错误个数 warningsCount告警个数
  logger.info(
    `webpack版本:${statsData.version} 错误数量: ${
      statsData.errorsCount
    } 警告数量: ${statsData.warningsCount} 编译耗时: ${statsData.time / 1000}s`,
  );
}

module.exports = function seedWebpackDev() {
  const { getCompiler } = getWebpackConfig();
  const compiler = getCompiler(prodConfig);
  compiler.run((err, stats) => {
    // 致命的 wepback 错误（配置出错等）
    if (err) {
      logger.err(err.stack || err);
      if (err.details) {
        logger.err(err.details);
      }
      return;
    }
    // 打印 编译错误（缺失的 module，语法错误等） 编译警告
    printStats(stats);
  });
};

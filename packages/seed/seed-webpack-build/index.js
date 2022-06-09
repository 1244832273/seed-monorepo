// 环境变量配置
process.env.NODE_ENV = 'production';
process.env.SEED_ENV = 'production';

const path = require('path');
const chalk = require('chalk');

const getWebpackConfig = require('@seedltw/webpack-config');

const prodConfig = {
  mode: 'production',
  output: {
    clean: true, // 在生成文件之前清空 output 目录
    filename: '[name].[contenthash].js', // 输出文件名
    path: path.join(process.cwd(), 'dist'), // 输出文件目录
  },
};

module.exports = function seedWebpackDev() {
  const { getCompiler } = getWebpackConfig();
  const compiler = getCompiler(prodConfig);
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      console.log('err', err);
      console.log('stats', stats);
      let messages;
      if (err) {
        if (!err.message) {
          return reject(err);
        }

        let errMessage = err.message;

        // Add additional information for postcss errors
        if (Object.prototype.hasOwnProperty.call(err, 'postcssNode')) {
          errMessage +=
            '\nCompileError: Begins at CSS selector ' +
            err['postcssNode'].selector;
        }
      }
      if (messages?.errors?.length) {
        // Only keep the first error. Others are often indicative
        // of the same problem, but confuse the reader with noise.
        if (messages.errors.length > 1) {
          messages.errors.length = 1;
        }
        return reject(new Error(messages.errors.join('\n\n')));
      }
      if (
        process.env.CI &&
        (typeof process.env.CI !== 'string' ||
          process.env.CI.toLowerCase() !== 'false') &&
        messages?.warnings?.length
      ) {
        console.log(
          chalk.yellow(
            '\nTreating warnings as errors because process.env.CI = true.\n' +
              'Most CI servers set it automatically.\n',
          ),
        );
        return reject(new Error(messages.warnings.join('\n\n')));
      }

      const resolveArgs = {
        stats,
        warnings: messages?.warnings,
      };

      return resolve(resolveArgs);
    });
  });
};

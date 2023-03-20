// 环境变量配置
process.env.NODE_ENV = 'development';
process.env.SEED_ENV = 'development';

const path = require('path');
const WebpackDevServer = require('webpack-dev-server');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');

const getWebpackConfig = require('@seedltw/webpack-config');

const devConfig = {
  mode: 'development',
  plugins: [new ErrorOverlayPlugin()],
  devtool: 'cheap-module-source-map',
  cache: {
    type: 'filesystem', // 使用文件缓存
  },
};

// console.log('path.resolve(__dirname)', path.resolve(__dirname, 'public'));

const devServerOptions = {
  // static允许我们在DevServer下访问该目录的静态资源
  // 简单理解来说 当我们启动DevServer时相当于启动了一个本地服务器
  // 这个服务器会同时以static-directory目录作为跟路径启动
  // 这样的话就可以访问到static/directory下的资源了
  static: {
    directory: path.resolve(__dirname, 'public'),
  },
  historyApiFallback: {
    // disableDotRule: true,
    index: '/',
  },
  https: true,
  open: true,
  // 默认为true
  hot: true,
  // 是否开启代码压缩
  compress: false,
  // 启动的端口
  port: 9000,
};

/**
 * @description: seed dev
 * @param {*} configFile seed.config配置文件
 * @param {*} options package.json配置文件 https证书文件路径 devServer配置
 * @return {*}
 */
module.exports = function seedWebpackDev(configFile, options) {
  const { getCompiler } = getWebpackConfig();
  const compiler = getCompiler(devConfig, configFile);

  // 合并配置文件server配置
  const mergeDevserver = { ...devServerOptions, ...options.devServer };

  const server = new WebpackDevServer(mergeDevserver, compiler);
  // 启动服务
  const runServer = async () => {
    console.log('Starting server...');
    await server.start();
  };
  runServer();
};

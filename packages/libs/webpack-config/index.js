'use strict';
const webpcak = require('webpack');
const { merge } = require('webpack-merge');

const path = require('path');
const defaultLoader = require('./loaders/defaultLoader');
const defaultPlugin = require('./plugins/defaultPlugin');

const cwd = process.cwd();

const alias = {
  '@': path.resolve(cwd, 'src'),
  Src: path.resolve(cwd, 'src'),
  Pages: path.resolve(cwd, 'src/pages'),
  Assets: path.resolve(cwd, 'src/assets'),
};

const webpackConfigDefault = (seedConfig) => ({
  entry: {
    main: path.resolve(cwd, 'src/index'),
  },
  output: {
    filename: '[name].[contenthash].js', // 输出文件名
    path: path.join(cwd, 'dist'), // 输出文件目录
  },
  resolve: {
    alias: alias,
    mainFiles: ['index', 'main'], // 解析目录时要使用的文件名
    extensions: ['.ts', '.tsx', '.jsx', '.js', '.scss', 'json'], // 配置文件不带后缀名 解析顺序
    modules: [
      'node_modules',
      path.resolve(cwd, 'src'),
      path.resolve(cwd, './node_modules'),
    ],
  },
  module: {
    rules: defaultLoader(seedConfig),
  },
  plugins: defaultPlugin(),
});

/**
 * @description: 生产webpack compiler对象
 * @param {*} config webpack配置
 * @param {*} configFile seed.config 配置
 * @return {compiler} compiler
 */
const getCompiler = (config, configFile) => {
  const { webpackMergeConfig = {}, ...seedConfig } = configFile;

  // 合并seedConfig和默认的webpack配置
  const defaultConfig = merge(
    webpackConfigDefault(seedConfig),
    webpackMergeConfig,
  );

  // 合并webpack 生产和开发独有的配置
  const combineConfig = merge(defaultConfig, config);

  // 生成compiler对象
  const compiler = webpcak(combineConfig);
  return compiler;
};

// 预留获取根目录配置
// todo 是否需要搞个类 处理webpack
module.exports = function getWebpackConfig() {
  return {
    webpackConfigDefault,
    getCompiler,
  };
};

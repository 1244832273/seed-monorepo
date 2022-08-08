'use strict';
const webpcak = require('webpack');
const { merge } = require('webpack-merge');

const path = require('path');
const defaultLoader = require('./loaders/defaultLoader');
const defaultPlugin = require('./plugins/defaultPlugin');

const cwd = process.cwd();

// seed.config配置
const seedConfig = require(cwd + '/seed.config.js');

const alias = {
  '@': path.resolve(cwd, 'src'),
  Src: path.resolve(cwd, 'src'),
  Pages: path.resolve(cwd, 'src/pages'),
  Assets: path.resolve(cwd, 'src/assets'),
};

const webpackConfigDefault = {
  entry: {
    main: path.resolve(cwd, 'src/index.tsx'),
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
};

const getCompiler = (config) => {
  // 合并seedConfig和默认的webpack配置
  const defaultConfig = merge(
    webpackConfigDefault,
    seedConfig?.webpackMergeConfig || {},
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

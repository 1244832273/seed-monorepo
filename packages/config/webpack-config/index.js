'use strict';

const path = require('path');
const defaultLoader = require('./loaders/defaultLoader');

const cwd = process.cwd();

const alias = {
  '@': path.resolve(process.cwd(), 'src'),
  Src: path.resolve(process.cwd(), 'src'),
  Pages: path.resolve(process.cwd(), 'src/pages'),
  Assets: path.resolve(process.cwd(), 'src/assets'),
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
      path.resolve(process.cwd(), 'src'),
      path.resolve(process.cwd(), './node_modules'),
    ],
  },
  module: {
    rules: defaultLoader(),
  },
  plugins: [],
};

// 预留获取根目录配置
// todo 是否需要搞个类 处理webpack
module.exports = function webpackConfig() {
  return webpackConfigDefault;
};

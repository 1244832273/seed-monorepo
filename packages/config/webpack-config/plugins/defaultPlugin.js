'use strict';

const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 自动清空打包目录 webpack5 不需要配置output clean就行
const WebpackBar = require('webpackbar'); // 进度条

const DEFAULT = [
  new MiniCssExtractPlugin({
    filename: 'assets/[name].[chunkhash].css',
  }),
  // 生成html名称为index.html
  // 生成使用的模板为public/index.html
  new htmlWebpackPlugin({
    filename: 'index.html',
    template: path.resolve(__dirname, '../public/index.html'),
  }),
  // new CleanWebpackPlugin(),
  new WebpackBar(),
];

module.exports = function defaultPlugins() {
  return DEFAULT;
};

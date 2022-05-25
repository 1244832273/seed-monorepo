'use strict';

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoPrefixer = require('autoprefixer');
const cssnano = require('cssnano');

const DEFAULT = {
  test: /\.(sa|sc|le|c)ss$/,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
    },
    'css-loader',
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          sourceMap: true,
          plugins: [
            autoPrefixer(),
            cssnano({
              preset: 'default',
            }),
          ],
        },
      },
    },
    // 当解析antd.less，必须写成下面格式，否则会报Inline JavaScript is not enabled错误
    {
      loader: 'less-loader',
      options: { lessOptions: { javascriptEnabled: true } },
    },
    {
      loader: 'resolve-url-loader',
    },
    {
      loader: 'sass-loader',
      options: {
        sourceMap: true,
      },
    },
  ],
};

module.exports = function cssLoader() {
  return DEFAULT;
};

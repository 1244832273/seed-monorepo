'use strict';

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoPrefixer = require('autoprefixer');
const cssnano = require('cssnano');

const COMMEN_CSS_LOADER = [
  {
    loader: MiniCssExtractPlugin.loader,
  },
  {
    loader: 'css-loader',
  },
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
];

const DEFAULT = [
  {
    oneOf: [
      {
        test: /\.css$/,
        use: [...COMMEN_CSS_LOADER],
      },
      {
        test: /\.less$/,
        use: [
          ...COMMEN_CSS_LOADER,
          // 当解析antd.less，必须写成下面格式，否则会报Inline JavaScript is not enabled错误
          {
            loader: 'less-loader',
            options: { lessOptions: { javascriptEnabled: true } },
          },
        ],
      },
      {
        test: /\.(sa|sc)ss$/,
        use: [
          ...COMMEN_CSS_LOADER,
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
      },
    ],
  },
];

module.exports = function cssLoader() {
  return DEFAULT;
};

'use strict';

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoPrefixer = require('autoprefixer');
const cssnano = require('cssnano');
const resolve = require.resolve;

const COMMEN_CSS_LOADER = [
  {
    loader: MiniCssExtractPlugin.loader,
  },
  {
    loader: resolve('css-loader'),
  },
  {
    loader: resolve('postcss-loader'),
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
            loader: resolve('less-loader'),
            options: { lessOptions: { javascriptEnabled: true } },
          },
        ],
      },
      {
        test: /\.(sa|sc)ss$/,
        use: [
          ...COMMEN_CSS_LOADER,
          {
            loader: resolve('resolve-url-loader'),
          },
          {
            loader: resolve('sass-loader'),
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

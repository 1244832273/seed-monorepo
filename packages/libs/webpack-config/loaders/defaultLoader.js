'use strict';

const babelLoader = require('./babelLoader');
const esbuildLoader = require('./esbuildLoader');
const cssLoader = require('./cssLoader');

const DEFAULT = [
  // asset/resource 将资源分割为单独的文件，并导出 url，类似之前的 file-loader 的功能.
  // asset/inline 将资源导出为 dataUrl 的形式，类似之前的 url-loader 的小于 limit 参数时功能.
  // asset/source 将资源导出为源码（source code）. 类似的 raw-loader 功能.
  // asset 会根据文件大小来选择使用哪种类型，当文件小于 8 KB（默认） 的时候会使用 asset/inline，否则会使用 asset/resource
  {
    test: /\.(png|jpe?g|svg|gif)$/,
    type: 'asset',
    generator: {
      // 输出文件位置以及文件名
      // [ext] 自带 "." 这个与 url-loader 配置不同
      filename: '[name][hash:8][ext]',
    },
    parser: {
      dataUrlCondition: {
        maxSize: 50 * 1024, //超过50kb不转 base64
      },
    },
  },
  {
    test: /\.(eot|ttf|woff|woff2)$/,
    type: 'asset/resource',
    generator: {
      filename: 'fonts/[hash][ext][query]',
    },
  },
];

module.exports = function defaultLoader(seedConfig) {
  // 是否使用esbuild
  const useEsbuild = seedConfig?.useEsbuild || false;

  const cssLoaderList = cssLoader();

  const babelLoaderList = babelLoader();
  const esbuildLoaderList = esbuildLoader();
  const jsLoaderList = useEsbuild ? esbuildLoaderList : babelLoaderList;
  return [...DEFAULT, ...cssLoaderList, ...jsLoaderList];
};

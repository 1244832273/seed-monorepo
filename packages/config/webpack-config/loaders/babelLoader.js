'use strict';
const path = require('path');

const DEFAULT = {
  test: /\.(t|j)sx?$/,
  use: [
    {
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
        cacheCompression: true,
        presets: [
          [
            '@babel/preset-env', // 将基于你的实际浏览器及运行环境，自动的确定babel插件及polyfill
            {
              useBuiltIns: 'entry',
              modules: false, // 意思是不转义import语法，主要是为了tree-shaking
            },
          ],
          '@babel/preset-react',
          '@babel/preset-typescript',
        ],
        plugins: [
          [
            '@babel/plugin-transform-runtime',
            {
              regenerator: true,
            },
          ],
        ],
      },
    },
  ],
  include: [path.resolve(process.cwd(), './src')],
};

module.exports = function babelLoader() {
  return DEFAULT;
};

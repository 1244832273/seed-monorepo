'use strict';
const path = require('path');

const DEFAULT = [
  {
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
                useBuiltIns: 'usage',
                corejs: {
                  version: '3.22.8',
                  proposals: true,
                },
                loose: true,
                modules: false, // 意思是不转义import语法，主要是为了tree-shaking
                targets: {
                  browsers: [
                    'last 2 versions',
                    'Firefox ESR',
                    '> 1%',
                    'ie >= 9',
                    'iOS >= 8',
                    'Android >= 4',
                  ],
                },
              },
            ],
            '@babel/preset-react',
            '@babel/preset-typescript',
          ],
          plugins: [
            [
              '@babel/plugin-transform-runtime',
              {
                corejs: 3,
              },
            ],
          ],
        },
      },
    ],
    include: [path.resolve(process.cwd(), './src')],
  },
];

module.exports = function babelLoader() {
  return DEFAULT;
};

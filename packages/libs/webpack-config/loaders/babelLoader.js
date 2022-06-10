'use strict';
const path = require('path');

// @babel/preset-env + entry = 注入语法的下限是 target 浏览器，上限是当前版本 core-js
// @babel/preset-env + usage = 注入语法的下限是 target 浏览器，上限是源代码与当前版本 core-js 交集
// @babel/plugin-transform-runtime = 当前版本整个 core-js
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
                // useBuiltIns: 'usage', // @babel/plugin-transform-runtime已经转换了不用再配置
                // corejs: {
                //   version: '3.22.8',
                //   proposals: true,
                // },
                // targets: {
                //   browsers: [
                //     'last 2 versions',
                //     'Firefox ESR',
                //     '> 1%',
                //     'ie >= 9',
                //     'iOS >= 8',
                //     'Android >= 4',
                //   ],
                // },
                loose: true,
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
                corejs: { version: 3, proposals: true }, // 配置会将垫片帮助函数抽离没有变量污染 推荐在类库中使用
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

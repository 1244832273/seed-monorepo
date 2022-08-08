'use strict';
const path = require('path');
const resolve = require.resolve;

const DEFAULT = [
  {
    test: /\.(t|j)sx?$/,
    use: [
      {
        loader: resolve('esbuild-loader'),
        options: {
          loader: 'tsx',
          target: 'es2015', // Syntax to compile to (see options below for possible values)
        },
      },
    ],
    include: [path.resolve(process.cwd(), './src')],
  },
];

module.exports = function esbuildLoader() {
  return DEFAULT;
};

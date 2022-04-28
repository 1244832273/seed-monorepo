#!/usr/bin/env node
const program = require('commander');
const packageInfo = require('../package.json');

program
  .version(packageInfo.version, '-v, -V, -version')
  .usage('<command> [options]');

program
  .description('seed指令, 歪比巴卜!')
  .command('dev', 'dev serve')
  .command('build', 'run build');

program.parse(process.argv);

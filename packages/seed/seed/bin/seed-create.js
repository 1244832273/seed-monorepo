#!/usr/bin/env node
const program = require('commander');
const inquirer = require('inquirer');
const ora = require('ora');
const logSymbols = require('log-symbols');

const seedCreate = require('@seedltw/seed-create');
const { chalk, logger } = require('@seedltw/message-utils');

let project_name = null;

program
  .usage('[projectName]')
  .arguments('[projectName]')
  .description('拉取脚手架项目')
  .action((projectName) => {
    // todo creat也能配置名称 预留
    project_name = projectName;
  })
  .parse(process.argv);

const questionDefault = [
  {
    type: 'rawlist',
    message: chalk.green('请选择初始化项目模板'),
    name: 'template',
    choices: Object.keys(seedCreate.TEMPLATE),
  },
];

const question = [
  {
    type: 'input',
    name: 'projectName',
    message: chalk.green('你的项目名称是?'),
  },
];

inquirer
  .prompt(project_name ? questionDefault : [...question, ...questionDefault])
  .then(({ projectName, template }) => {
    const newProjectName = project_name || projectName;

    let spinner = ora(chalk.blue(`下载模板: ${template}`));

    spinner.start();

    seedCreate(newProjectName, template)
      .then(() => {
        spinner.succeed();
      })
      .catch((err) => {
        spinner.fail(logger.err(err));
      });
  })
  .catch((error) => {
    logger.err(error);
    process.exit(-1);
  });

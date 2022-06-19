const chalk = require('chalk');
const Logger = require('./lib/logger');

const logger = new Logger();
module.exports = {
  chalk,
  logger,
};

const path = require('path');

class SeedConfigUtils {
  constructor(configPath = './seed.config.js', packagePath = './package.js') {
    this.configPath = configPath;
    this.packagePath = packagePath;
  }
}

module.exports = SeedConfigUtils;

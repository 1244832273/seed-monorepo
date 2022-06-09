#!/usr/bin/env node
const program = require('commander');
const seedWebpackBuild = require('@seedltw/seed-webpack-build');

function runBuild() {
  seedWebpackBuild();
}

runBuild();

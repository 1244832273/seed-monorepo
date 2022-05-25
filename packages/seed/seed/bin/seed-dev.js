#!/usr/bin/env node
const program = require('commander');
const seedWebpackDev = require('@seedltw/seed-webpack-dev');

function startServe() {
  seedWebpackDev();
}

startServe();

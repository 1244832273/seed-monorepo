#!/usr/bin/env node
const program = require('commander');
const seedWebpackDev = require('@seed/seed-webpack-dev');

function startServe() {
  seedWebpackDev();
}

startServe();

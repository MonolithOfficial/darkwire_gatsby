const process = require('process');
const path = require('path');
const version = require('./version.js');
let rootPath = process.cwd();

module.exports = {
  rootPath: rootPath,
  serverPath: path.join(rootPath + '/server/'),
  version: version,
};
/* eslint-disable import/no-extraneous-dependencies */

const path = require('path');
const fs = require('fs');
const shell = require('shelljs');
const packageJson = require('./package.init.json');

const resolve = fileName => path.resolve(__dirname, '../', fileName);
const modName = process.env.npm_config_package;

if (!modName) {
  console.log('未提供sdk包名，你应该这样使用 npm run create:package --package=moduleName');
  return;
}

const packagePath = resolve(`packages/${modName}`);
if (fs.existsSync(packagePath)) {
  console.log('packages目录下已存在该sdk包');
  return;
}

shell.mkdir(packagePath);
packageJson.name = modName;
fs.writeFileSync(`${packagePath}/package.json`, JSON.stringify(packageJson, '', 2), 'utf8');
fs.writeFileSync(`${packagePath}/index.js`, '', 'utf8');

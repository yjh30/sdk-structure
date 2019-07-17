/* eslint-disable import/no-extraneous-dependencies */

const path = require('path');
const fs = require('fs');
const shell = require('shelljs');
const packageJson = require('./package.config.json');

const resolve = fileName => path.resolve(__dirname, '../', fileName);
const dirname = process.env.npm_config_dirname;

if (!dirname) {
  console.log('未提供sdk包目录名，你应该这样使用 npm run create:package --dirname=包目录名');
  return;
}

const packagePath = resolve(`packages/${dirname}`);
if (fs.existsSync(packagePath)) {
  console.log('packages目录下已存在该sdk包');
  return;
}

shell.mkdir(packagePath);
packageJson.name = `@esign/${dirname}`;
packageJson.main = `lib/${dirname}.runtime.min.js`;
packageJson.files = [
  'package.json',
  'lib/',
];
packageJson.publishConfig = {
  registry: 'http://118.31.173.195:4873',
};
fs.writeFileSync(`${packagePath}/package.json`, JSON.stringify(packageJson, '', 2), 'utf8');
fs.writeFileSync(`${packagePath}/index.js`, '', 'utf8');

/* eslint-disable import/no-extraneous-dependencies */

const path = require('path');
const fs = require('fs');
const shell = require('shelljs');
const packageJson = require('./package.config.json');
const htmlTpl = require('./html.template');

const resolve = fileName => path.resolve(__dirname, '../../', fileName);
const dirname = process.env.npm_config_dirname;

if (!dirname) {
  console.log('未提供sdk包目录名，你应该这样使用 npm run create:package --dirname=包目录名');
  return;
}

if (!fs.existsSync(resolve('packages'))) {
  shell.mkdir(resolve('packages'));
}

const dirnamePath = resolve(`packages/${dirname}`);
if (fs.existsSync(dirnamePath)) {
  console.log('packages目录下已存在该sdk包');
  return;
}

shell.mkdir(dirnamePath);
packageJson.name = `@esign/${dirname}`;
packageJson.main = `lib/${dirname}.runtime.min.js`;
packageJson.files = [
  'package.json',
  'lib/',
];
packageJson.publishConfig = {
  registry: 'http://118.31.173.195:4873',
};

fs.writeFileSync(`${dirnamePath}/package.json`, JSON.stringify(packageJson, '', 2), 'utf8');

const packagePath = path.join(dirnamePath, 'package');
shell.mkdir(packagePath);
shell.touch(`${packagePath}/index.js`);

const examplePath = path.join(dirnamePath, 'example');
shell.mkdir(examplePath);
shell.touch(`${examplePath}/example.js`);
shell.touch(`${examplePath}/example.umd.js`);
fs.writeFileSync(`${examplePath}/index.html`, htmlTpl, 'utf8');

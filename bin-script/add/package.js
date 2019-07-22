/* eslint-disable import/no-extraneous-dependencies */

const path = require('path');
const fs = require('fs');
const shell = require('shelljs');
const { createPackageJson, createExample } = require('./utils');

const resolve = fileName => path.resolve(__dirname, '../../', fileName);
const dirname = process.env.npm_config_dirname;

function mkDirnamePath() {
  if (!dirname) {
    console.log('未提供sdk包目录名，你应该这样使用 npm run create:package --dirname=包目录名');
    return false;
  }
  if (!fs.existsSync(resolve('packages'))) {
    shell.mkdir(resolve('packages'));
  }

  const dirnamePath = resolve(`packages/${dirname}`);
  if (fs.existsSync(dirnamePath)) {
    console.log('packages目录下已存在该sdk包');
    return false;
  }

  shell.mkdir(dirnamePath);

  // eslint-disable-next-line consistent-return
  return dirnamePath;
}

function createPackage(_dirnamePath) {
  const packagePath = path.join(_dirnamePath, 'package');
  shell.mkdir(packagePath);
  shell.touch(`${packagePath}/index.js`);
}

const dirnamePath = mkDirnamePath();
if (dirnamePath === false) {
  return;
}

createPackageJson({
  dirname,
  dirnamePath,
});
createPackage(dirnamePath);
createExample(dirnamePath);

shell.touch(`${dirnamePath}/README.md`);

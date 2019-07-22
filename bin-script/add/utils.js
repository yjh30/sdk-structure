const path = require('path');
const fs = require('fs');
// eslint-disable-next-line import/no-extraneous-dependencies
const shell = require('shelljs');
const packageJson = require('./tpl/package.config.json');
const htmlTpl = require('./tpl/html.template');

function createPackageJson({
  dirname,
  dirnamePath,
  createBefore,
}) {
  const json = { ...packageJson };
  json.name = `@esign/${dirname}`;
  json.main = `lib/${dirname}.runtime.min.js`;
  json.files = [
    'package.json',
    'lib/',
    'README.md',
  ];
  json.publishConfig = {
    registry: 'http://118.31.173.195:4873',
  };

  if (typeof createBefore === 'function') {
    createBefore(json);
  }

  fs.writeFileSync(`${dirnamePath}/package.json`, JSON.stringify(json, '', 2), 'utf8');
}

function createExample(dirnamePath) {
  const examplePath = path.join(dirnamePath, 'example');
  shell.mkdir(examplePath);
  shell.touch(`${examplePath}/example.js`);
  shell.touch(`${examplePath}/example.umd.js`);
  fs.writeFileSync(`${examplePath}/index.html`, htmlTpl, 'utf8');
}

exports.createPackageJson = createPackageJson;
exports.createExample = createExample;

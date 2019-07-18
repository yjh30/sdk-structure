/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */

const path = require('path');
const fs = require('fs');
const shell = require('shelljs');
const camelCase = require('camelcase');
const htmlTpl = require('./html.template');

const resolve = fileName => path.resolve(__dirname, '../../', fileName);

const dirname = path.basename(process.cwd());
const dirnamePath = resolve(`packages/${dirname}`);

const packageDirnames = [];
fs.readdirSync(resolve('packages')).forEach((dir) => {
  if (dir === dirname) {
    return;
  }
  if (fs.statSync(resolve(`packages/${dir}`)).isDirectory()) {
    packageDirnames.push(dir);
  }
});

function updateIndexjs() {
  let importContent = '';
  let exportsContent = '';
  let defaultContent = 'export default {\n';

  packageDirnames.forEach((packageDirname) => {
    const varName = camelCase(packageDirname);
    importContent += `import ${varName} from '@esign/${packageDirname}';\n`;
    exportsContent += `exports.${varName} = ${varName};\n`;
    defaultContent += `  ${varName},\n`;
  });

  defaultContent += '};';

  const packagePath = path.join(dirnamePath, 'package');
  if (!fs.existsSync(packagePath)) {
    shell.mkdir(packagePath);
  }

  fs.writeFileSync(`${packagePath}/index.js`,
    `/* eslint-disable */\n
${importContent}
${exportsContent}
${defaultContent}\n`, 'utf8');
}

function createPackageJson() {
  // eslint-disable-next-line global-require
  const packageJson = require('./package.config.json');

  packageJson.name = `@esign/${dirname}`;
  packageJson.main = `lib/${dirname}.runtime.min.js`;
  packageJson.files = [
    'package.json',
    'lib/',
    'README.md',
  ];
  packageJson.publishConfig = {
    registry: 'http://118.31.173.195:4873',
  };
  packageJson.dependencies = {};
  packageDirnames.forEach((packageDirname) => {
    // eslint-disable-next-line import/no-dynamic-require
    const { name, version } = require(resolve(`packages/${packageDirname}/package.json`));
    packageJson.dependencies[name] = `^${version}`;
  });

  fs.writeFileSync(`${dirnamePath}/package.json`, JSON.stringify(packageJson, '', 2), 'utf8');
}

function createExample() {
  const examplePath = path.join(dirnamePath, 'example');
  shell.mkdir(examplePath);
  shell.touch(`${examplePath}/example.js`);
  shell.touch(`${examplePath}/example.umd.js`);
  fs.writeFileSync(`${examplePath}/index.html`, htmlTpl, 'utf8');
}

if (!fs.existsSync(dirnamePath)) {
  shell.mkdir(dirnamePath);
  createPackageJson();
  createExample();
  shell.touch(`${dirnamePath}/README.md`);
}
updateIndexjs();

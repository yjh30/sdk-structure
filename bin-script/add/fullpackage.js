/* eslint-disable no-param-reassign */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */

const path = require('path');
const fs = require('fs');
const shell = require('shelljs');
const camelCase = require('camelcase');
const { createPackageJson, createExample } = require('./utils');

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

function createFullPackageJson() {
  createPackageJson({
    dirname,
    dirnamePath,
    createBefore(packageJson) {
      packageJson.dependencies = {};
      packageDirnames.forEach((packageDirname) => {
        const { name, version } = require(resolve(`packages/${packageDirname}/package.json`));
        packageJson.dependencies[name] = `^${version}`;
      });
    },
  });
}

function init() {
  if (!fs.existsSync(dirnamePath)) {
    shell.mkdir(dirnamePath);
    createFullPackageJson();
    createExample(dirnamePath);
    shell.touch(`${dirnamePath}/README.md`);
  }
  createFullPackageJson();
  updateIndexjs();
}

init();

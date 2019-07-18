/* eslint-disable import/no-extraneous-dependencies */

const path = require('path');
const fs = require('fs');
const shell = require('shelljs');
const camelCase = require('camelcase');

const resolve = fileName => path.resolve(__dirname, '../', fileName);

const fullpackageName = path.basename(process.cwd());
const fullpackageDir = resolve(`packages/${fullpackageName}`);

function updateIndexjs() {
  const packages = [];
  fs.readdirSync(resolve('packages')).forEach((dir) => {
    if (dir === fullpackageName) {
      return;
    }
    if (fs.statSync(resolve(`packages/${dir}`)).isDirectory()) {
      packages.push(dir);
    }
  });

  let importContent = '';
  let exportsContent = '';
  let defaultContent = 'export default {\n';

  packages.forEach((packageName) => {
    const varName = camelCase(packageName);
    importContent += `import ${varName} from 'packages/${packageName}';\n`;
    exportsContent += `exports.${varName} = ${varName};\n`;
    defaultContent += `  ${varName},\n`;
  });

  defaultContent += '};';

  fs.writeFileSync(`${fullpackageDir}/index.js`,
    `/* eslint-disable */\n
${importContent}
${exportsContent}
${defaultContent}\n`, 'utf8');
}

function createPackageJson() {
  // eslint-disable-next-line global-require
  const packageJson = require('./package.config.json');
  packageJson.name = fullpackageName;
  fs.writeFileSync(`${fullpackageDir}/package.json`, JSON.stringify(packageJson, '', 2), 'utf8');
}

process.chdir(`${process.cwd()}/packages`);
if (!fs.existsSync(fullpackageDir)) {
  shell.mkdir(fullpackageDir);
  createPackageJson();
}
updateIndexjs();
process.chdir(path.join(process.cwd(), '../'));

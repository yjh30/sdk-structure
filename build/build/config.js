/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const fs = require('fs');
const camelCase = require('camelcase');

const resolve = filePath => path.resolve(__dirname, '../../', filePath);
const runtime = process.env.npm_config_runtime;
const dirname = process.env.npm_config_dirname || path.basename(process.cwd());

const entry = {};
let output = {
  path: resolve(`packages/${dirname}/lib`),
  libraryTarget: 'commonjs2',
};
const externals = {};
const eslintExclude = [/node_modules/];

function updateEntry() {
  let key = `${dirname}.runtime.min`;
  if (!runtime) {
    key = `${dirname}.min`;
  }
  entry[key] = resolve(`packages/${dirname}/package/index.js`);

  const buildFileFullPath = resolve(`packages/${dirname}/lib/${key}.js`);
  return {
    buildFileFullPath,
  };
}

function updateOutput() {
  const getLibrary = () => {
    let name = camelCase(dirname);
    name = `${name.charAt(0).toUpperCase()}${name.substring(1)}`;
    return `esign${name}`;
  };
  if (!runtime) {
    output = {
      ...output,
      library: getLibrary(),
      libraryExport: 'default',
      libraryTarget: 'umd',
    };
  }
}

function updateExternals(callback) {
  fs.readdirSync(resolve('packages')).forEach((packageDirname) => {
    if (typeof callback === 'function') {
      callback(packageDirname);
    }
    if (!runtime) {
      return;
    }
    if (fs.statSync(resolve(`packages/${packageDirname}`)).isDirectory()) {
      externals[`@esign/${packageDirname}`] = `@esign/${packageDirname}`;
    }
  });
}

const { buildFileFullPath } = updateEntry();
updateOutput();
updateExternals((packageDirname) => {
  eslintExclude.push(resolve(`packages/${packageDirname}/lib`));
});

exports.buildFileFullPath = buildFileFullPath;
exports.entry = entry;
exports.output = output;
exports.externals = externals;
exports.eslintExclude = eslintExclude;

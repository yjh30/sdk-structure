/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const fs = require('fs');
const camelCase = require('camelcase');
const shell = require('shelljs');

const config = require('./config');

const resolve = fileName => path.resolve(__dirname, '../', fileName);
const modName = process.env.npm_config_package || path.basename(process.cwd());
const packagePath = resolve(`packages/${modName}`);
const outputPath = resolve(`lib/${modName}`);

if (modName && !fs.existsSync(packagePath)) {
  console.log('packages目录下不存在该包名');
  return;
}

shell.rm('-rf', outputPath);
shell.cp('-R', packagePath, outputPath);

const entry = {};
entry.index = resolve(`packages/${modName}/index.js`);
const library = camelCase(modName);

module.exports = {
  mode: 'production',
  entry,
  output: {
    path: outputPath,
    filename: '[name].js',
    library,
    libraryExport: 'default',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  resolve: {
    alias: config.alias,
  },
  externals: config.externals,
};

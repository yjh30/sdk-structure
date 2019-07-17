const path = require('path');
const fs = require('fs');
const shell = require('shelljs');

const {
  buildFileFullPath,
  entry,
  output: outputConfig,
  externals,
  eslintExclude,
} = require('./config');

const resolve = fileName => path.resolve(__dirname, '../', fileName);
const dirname = process.env.npm_config_dirname || path.basename(process.cwd());
const dirnamePath = resolve(`packages/${dirname}`);

if (dirname && !fs.existsSync(dirnamePath)) {
  console.log(`packages目录下不存在该${dirname}目录`);
  return;
}

// 移除上一次构建的文件
if (fs.existsSync(buildFileFullPath)) {
  shell.rm('-rf', buildFileFullPath);
}

module.exports = {
  mode: 'production',
  entry,
  output: {
    filename: '[name].js',
    ...outputConfig,
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: eslintExclude,
        loader: 'eslint-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  externals,
};

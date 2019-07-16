const path = require('path');
const fs = require('fs');

const resolve = filePath => path.resolve(__dirname, '../', filePath);
const externals = {};

const packagesArr = fs.readdirSync(resolve('packages'));

packagesArr.forEach((packageName) => {
  if (fs.statSync(resolve(`packages/${packageName}`)).isDirectory()) {
    externals[`packages/${packageName}`] = packageName;
  }
});

exports.alias = {
  packages: path.resolve(__dirname, '../packages'),
};

exports.externals = externals;

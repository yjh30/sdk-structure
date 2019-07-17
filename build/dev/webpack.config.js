const HtmlWebpackPlugin = require('html-webpack-plugin');

const resolve = filePath => path.resolve(__dirname, '../', filePath);

// npm run dev --dirname=module-a

const dirname = process.env.npm_config_dirname;

module.exports = {
  mode: 'development',
  entry: {
    app: resolve(`packages/${dirname}/src/main.js`),
  },
  output: {
    path: resolve(`packages/${dirname}/dist`),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')],
      },
    ],
  },
};

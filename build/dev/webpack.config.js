const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const internalIp = require('internal-ip');

const resolve = filePath => path.resolve(__dirname, '../../', filePath);
const dirname = process.env.npm_config_dirname;
const runtime = process.env.npm_config_runtime;

module.exports = {
  mode: 'development',
  entry: {
    app: resolve(`packages/${dirname}/example/${runtime ? 'example' : 'example.umd'}.js`),
  },
  output: {
    path: resolve(`packages/${dirname}/lib/`),
    filename: '[name].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('node_modules/webpack-dev-server/client')],
      },
    ],
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    clientLogLevel: 'warning',
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: internalIp.v4.sync(),
    port: 3001,
    open: true,
    overlay: { warnings: false, errors: true },
    publicPath: '/',
    proxy: {},
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: false,
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: resolve(`packages/${dirname}/example/index.html`),
      inject: true,
      libUrl: !runtime ? `/${dirname}.min.js` : '',
    }),
  ],
};

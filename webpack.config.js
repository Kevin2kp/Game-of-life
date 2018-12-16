const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const APP_NAME = `Conway's Game of Life`;
const OUT_NAME = 'conways-gol.js';

module.exports = {
  entry: path.resolve(__dirname, 'app', 'main.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: OUT_NAME,
  },
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'app'),
    ],
  },
  devtool: 'inline-source-map',
  context: __dirname,
  target: 'web',
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      title: APP_NAME,
      myPageHeader: APP_NAME,
      template: path.resolve(__dirname, 'app', 'index.html'),
      filename: path.resolve(__dirname, 'dist', 'index.html'), //relative to root of the application
    }),
  ],
};
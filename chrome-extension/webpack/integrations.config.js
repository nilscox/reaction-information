/* eslint-disable */

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

const EXTENSION_PATH = path.resolve(__dirname, '..', 'extension');
const INTEGRATIONS_PATH = path.resolve(__dirname, '..', 'src', 'integrations');

const loadEntries = () => {
  return fs.readdirSync(INTEGRATIONS_PATH)
    .map(filename => path.join(INTEGRATIONS_PATH, filename))
    .reduce((o, p) => {
      o[path.basename(p)] = p;
      return o;
    }, {});
};

module.exports = {

  mode: 'development',
  entry: loadEntries,
  devtool: 'inline-source-map',

  output: {
    filename: '[name]',
    path: path.resolve(EXTENSION_PATH, 'integrations'),
  },

  plugins: [
    new Dotenv({
      safe: true,
    }),
  ],

};
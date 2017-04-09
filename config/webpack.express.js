const helpers = require('./helpers');
const fs = require('fs');

const DefinePlugin = require('webpack/lib/DefinePlugin');
const BannerPlugin = require('webpack/lib/BannerPlugin');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {

  entry: {
    'server': './src/server/server.ts',
  },
  output: {
    path: helpers.root('dist'),
    filename: '[name].js'
  },
  externals: nodeModules,
  target: 'node',
  devtool:'sourcemap',
  resolve: {
    extensions: ['.ts', '.js', '.json', '.node']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
            loader: 'awesome-typescript-loader',
            options: { configFileName: helpers.root('tsconfig.json') }
        }
      },
      {
        test: /\.json$/,
        use: 'json-loader'
      }
    ]
  },
  plugins: [
    new BannerPlugin({ banner: 'require("source-map-support").install();', raw: true, entryOnly: false })
  ]
};
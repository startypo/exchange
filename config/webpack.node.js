const helpers = require('./helpers');
var fs = require('fs');

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
  target: 'node',
  devtool:'sourcemap',
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
            loader: 'awesome-typescript-loader',
            options: { configFileName: helpers.root('tsconfig.json') }
        }
      }
    ]
  },
  plugins: [  ]
};
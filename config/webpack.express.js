const helpers = require('./helpers');

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
  plugins: []
};
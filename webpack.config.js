const path = require('path');

module.exports = {
  entry: {
    popover: './src/index.js',
    react: './src/react/index.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    library: 'popoverjs',
    libraryTarget: 'umd',
  },
  module: {
    rules: [{
      test: /\.scss$/,
      use: [{
        loader: 'style-loader', // creates style nodes from JS strings
      }, {
        loader: 'css-loader', // translates CSS into CommonJS
      }, {
        loader: 'sass-loader', // compiles Sass to CSS
      }],
    }, {
      test: [/\.js$/],
      exclude: [/node_modules/],
      loader: 'babel-loader',
      options: { presets: ['react', 'es2015', 'stage-0'] },
    }],
  },
};

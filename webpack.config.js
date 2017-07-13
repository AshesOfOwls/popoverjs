var path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'popoverjs.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'popoverjs',
    libraryTarget: 'umd',
  },
  module: {
        rules: [{
            test: /\.scss$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "sass-loader" // compiles Sass to CSS
            }]
        }]
    }
};

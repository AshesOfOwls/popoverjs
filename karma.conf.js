const webpackConfig = require('./webpack.config.js');

// karma.conf.js  --  karma configuration

// if you import your existing 'webpack.config.js' setup here,
// be sure to read the note about 'entry' below.

module.exports = (config) => {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'tests/**/*.test.js',
      'tests/**/*.test.jsx',
    ],
    preprocessors: {
      'tests/**/*.test.js': ['webpack'],
      'tests/**/*.test.jsx': ['webpack'],
    },
    webpack: webpackConfig,
    reporters: ['mocha'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: true,
    concurrency: Infinity,
    browserConsoleLogOptions: {
      terminal: true,
      level: '',
    },
  });
};

const path = require('path');

module.exports = {
  dest: {
    distPath:  path.resolve(__dirname, '../dist'),
    clean: [
      path.resolve(__dirname, '../dist'),
    ],
  },
  src: {
    entry: './app/src/main.js',
    htmlIndex: './app/src/index.html',
    configPath: path.resolve(__dirname, '../app/config/default.js'),
    reports: {
      scripts: ['app/**/*.js'],
      styles: ['app/**/*.scss'],
      maxWarnings: 0,
    },
  },
  serverOptions: {
    spaPort: 3000,
    apiPort: 8085,
  },
};

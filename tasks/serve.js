const gulp = require('gulp');
const webpack = require('webpack');

const clean = require('./clean');
const { serverOptions } = require('./build-config');

const serve = gulp.series(clean, (cb) => {
  const WebpackDevServer = require('webpack-dev-server');
  const config = require('./webpack.config')();

  const compiler = webpack(config);

  const devServer = {
    compress: true,
    port: serverOptions.spaPort,
    static: [
      {
        directory: 'models',
        publicPath: '/models',
      },
    ],
    client: {
      overlay: { errors: true, warnings: false },
    },
    hot: true,
  };

  const server = new WebpackDevServer(devServer, compiler);
  server.start();

  return cb();
});

module.exports = serve;

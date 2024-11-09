const gulp = require('gulp');

const serveWebApp = require('./tasks/serve');
const serveAPI = require('./tasks/api/serve-api');
const { scriptsLint, stylesLint } = require('./tasks/lint');

exports.serve = gulp.parallel(serveAPI, serveWebApp);
exports.serveWebApp = serveWebApp;
exports.lint = gulp.parallel(scriptsLint, stylesLint);

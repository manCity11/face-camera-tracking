const del = require('del');
const { dest } = require('./build-config');

const clean = (cb) => del(dest.clean, cb);

module.exports = clean;

const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const { SerialPort } = require('serialport');
const { serialPort, serialBaudRate } = require('minimist')(process.argv.slice(2));

const { serverOptions } = require('../build-config');
const { PATH_API } = require('./route-paths');

const serveApi = (cb) => {
  const server = express();
  const serialCommunication = new SerialPort({
    path: serialPort,
    baudRate: serialBaudRate,
  });

  server.use(cors());
  server.use(bodyParser.json());

  server.post(PATH_API, ({ body = {} } = {}, res) => {
    serialCommunication.write(`${body?.x},${body?.y}\n`, (err) => res
      .status(err ? 500 : 200)
      .json({
        status: !err,
        error: err ? { message: 'Internal error' } : undefined,
      }));
  });

  server.listen(serverOptions.apiPort, () => {
    console.log(`========== server is running on port ${serverOptions.apiPort}`);
  });

  return cb();
};

module.exports = serveApi;

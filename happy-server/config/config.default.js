'use strict';
const path = require('path');

/** @param {Egg.EggAppInfo} appInfo */
module.exports = appInfo => {
  const config = {};
  config.keys = `${appInfo.name}_1578244165006_1223`;
  config.middleware = [];

  config.security = {
    csrf: false,
  };
  config.cors = {
    origin: '*',
    allowMethods: 'GET,POST,PUT,DELETE',
  };

  config.static = {
    prefix: '',
    dir: path.join(appInfo.baseDir, '../happy-client/dist'),
  };

  config.cluster = {
    listen: { port: 7002 },
  };
  return config;
};

'use strict';
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

  return config;
};

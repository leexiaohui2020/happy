'use strict';
/** @param {Egg.Application} app */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/list', controller.home.list);
  router.post('/image', controller.home.image);
};

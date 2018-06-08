'use strict';

module.exports = app => {
  const { router, controller } = app;

  router.get('/search', controller.search.index);
  router.get('/search2', controller.search.index2);
  router.get('s', '/search3', app.middlewares.uppercase(), controller.search.index3);
};

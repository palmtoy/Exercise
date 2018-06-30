'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
// app/router.js
module.exports = app => {
  const { router, controller } = app;
  // router.get('/', controller.home.index);
  router.get('index', '/home/index', controller.home.index);
  router.redirect('/', '/home/index', 302);

  router.get('/news', controller.news.list);

  router.post('/user/create', controller.user.create);
  router.get('/user/:id/:name', controller.user.info);

  router.get(/^\/package\/([\w-.]+\/[\w-.]+)$/, controller.package.detail);
  router.post('/form', controller.form.post);

  router.get('/post', controller.post.list);

  require('./router/search')(app);
};

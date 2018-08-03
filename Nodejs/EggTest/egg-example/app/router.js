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

  router.get('/usersql-users', 'userSql.users');
  router.get('/usersql-user/:id', 'userSql.user');
  router.post('/usersql-create', 'userSql.create');
  router.put('/usersql-update/:id', 'userSql.update');
  router.delete('/:id', 'userSql.del');

  router.get(/^\/package\/([\w-.]+\/[\w-.]+)$/, controller.package.detail);
  router.post('/form', controller.form.post);

  router.get('/post', controller.post.list);

  router.get('/multiple-file', controller.multiple.show);
  router.post('/multiple-file', controller.multiple.upload);

  require('./router/search')(app);

};

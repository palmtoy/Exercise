'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1528080180147_6341';

  // add your config here
  config.middleware = [];

  // add view's configurations
  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks',
    },
  };

  config.news = {
    pageSize: 5,
    serverUrl: 'http://localhost:8080/sisp',
  };

  // add middleware robot
  config.middleware = [
    'robot',
  ];
  // robot's configurations
  config.robot = {
    ua: [
      /Baiduspider/i,
    ],
  };

  config.security = {
    csrf: false,
  };

  config.customLogger = {
    scheduleLogger: {
      // consoleLevel: 'NONE',
      // file: path.join(appInfo.root, 'logs', appInfo.name, 'egg-schedule.log'),
    },
  };

  config.mongoose = {
    url: 'mongodb://localhost/test',
  };

  config.multipart = {
    fileSize: '50mb',
    whitelist: [ '.tar' ],
  };

  config.sequelize = {
    dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    database: 'test',
    host: 'localhost',
    port: '3306',
    username: 'root',
    password: '',
  };

  return config;
};

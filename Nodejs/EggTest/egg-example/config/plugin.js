'use strict';

// had enabled by egg
// exports.static = true;

exports.nunjucks = {
  enable: true,
  package: 'egg-view-nunjucks',
};

exports.validate = {
  enable: true,
  package: 'egg-validate',
};

exports.mongoose = {
  enable: false,
  package: 'egg-mongoose',
};

exports.sequelize = {
  enable: true,
  package: 'egg-sequelize',
};

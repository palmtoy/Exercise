'use strict';

const co = require('co');

module.exports = {
  up: co.wrap(function* (db, Sequelize) {
    const { INTEGER, DATE, STRING } = Sequelize;

    yield db.createTable('UserSqls', {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: STRING(30),
      age: INTEGER,
      created_at: DATE,
      updated_at: DATE,
    });

  }),

  down: co.wrap(function* (db) {
    yield db.dropTable('UserSqls');
  }),
};

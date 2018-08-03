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

    yield db.addColumn('UserSqls', 'email', {
      type: STRING(30),
    });

    yield db.changeColumn('UserSqls', 'email', {
      type: STRING(50),
      // type: INTEGER,
    });
  }),

  down: co.wrap(function* (db) {
    // yield db.dropTable('UserSqls');
    return db.removeColumn('UserSqls', 'email');
  }),

};

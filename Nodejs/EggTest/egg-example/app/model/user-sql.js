'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const User = app.model.define('UserSql', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: STRING(30),
    email: STRING(30),
    age: INTEGER,
    created_at: DATE,
    updated_at: DATE,
  });

  return User;
};

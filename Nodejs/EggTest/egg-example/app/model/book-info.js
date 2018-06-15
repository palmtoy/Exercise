'use strict';

const autoIncrement = require('mongoose-plugin-autoinc');

module.exports = app => {

  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const conn = app.mongooseDB.base.connection;
  autoIncrement.initialize(conn);

  const BookInfoSchema = new Schema({
    bookId: { type: Number },
    bookName: { type: String },
  }, { collection: 'book_info', timestamps: true });

  BookInfoSchema.plugin(autoIncrement.plugin, {
    model: 'BookInfo',
    field: 'bookId',
    startAt: 100,
  });

  return mongoose.model('BookInfo', BookInfoSchema);

};

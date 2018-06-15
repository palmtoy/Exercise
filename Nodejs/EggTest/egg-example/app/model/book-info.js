'use strict';

module.exports = app => {

  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const BookInfoSchema = new Schema({
    bookId: { type: Number },
    bookName: { type: String },
  }, { collection: 'book_info', timestamps: true });

  return mongoose.model('BookInfo', BookInfoSchema);

};

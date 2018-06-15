'use strict';

const Service = require('egg').Service;

class BookInfoService extends Service {

  async addOneBook() {
    const now = Date.now();
    const insertData = { bookId: now, bookName: 'Book-' + now };
    await this.ctx.model.BookInfo.create(insertData).then(rs => {
      this.ctx.logger.info(rs);
    });
  }

}

module.exports = BookInfoService;

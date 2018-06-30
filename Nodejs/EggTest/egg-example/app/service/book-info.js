'use strict';

const Service = require('egg').Service;

class BookInfoService extends Service {

  async addOneBook() {
    const insertData = { bookName: 'Book-' + Math.floor(Math.random() * 100) };
    await this.ctx.model.BookInfo.create(insertData).then(rs => {
      this.ctx.logger.info(rs);
    });
  }

}

module.exports = BookInfoService;

'use strict';

const Service = require('egg').Service;

class NewsService extends Service {
  async list(page = 1) {
    // read config
    const { serverUrl, pageSize } = this.config.news;

    const dataList = {
      list: [
        { id: page, title: 'this is news ' + page + '/' + pageSize, url: serverUrl + '/news/' + page + '/' + pageSize },
        { id: ++page, title: 'this is news ' + page + '/' + pageSize, url: serverUrl + '/news/' + page + '/' + pageSize },
      ],
    };

    return dataList;
  }
}

module.exports = NewsService;

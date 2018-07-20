'use strict';

const Subscription = require('egg').Subscription;

class PollingPrint extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {
    return {
      type: 'worker', // 随机某个 worker 执行
      // interval: '5s',
      interval: '60m',
    };
  }

  // subscribe 是真正定时任务执行时被运行的函数
  async subscribe() {
    // console.log(new Date() + ' ~ Hi baby!');
    this.ctx.logger.info(new Date() + ' ~ Hi baby!');

    this.ctx.service.bookInfo.addOneBook();
  }
}

module.exports = PollingPrint;

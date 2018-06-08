'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async info() {
    const { ctx } = this;
    ctx.body = {
      user: `${ctx.params.id}, ${ctx.params.name}`,
      msg: `hello ${ctx.params.name}`,
    };
  }
}

module.exports = UserController;

// curl http://127.0.0.1:7001/user/123/xiaoming

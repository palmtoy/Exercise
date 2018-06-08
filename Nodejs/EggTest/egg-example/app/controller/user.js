'use strict';

const Controller = require('egg').Controller;

const createRule = {
  username: {
    type: 'email',
  },
  password: {
    type: 'password',
    compare: 're-password',
  },
};

class UserController extends Controller {
  // curl http://127.0.0.1:7001/user/123/xiaoming
  async info() {
    const { ctx } = this;
    ctx.body = {
      user: `${ctx.params.id}, ${ctx.params.name}`,
      msg: `hello ${ctx.params.name}`,
    };
  }

  // curl -X POST http://127.0.0.1:7001/user/create --data 'username=uvw@xyz.com&password=123456&re-password=123456'
  async create() {
    const { ctx } = this;
    // 如果校验报错, 会抛出异常
    ctx.validate(createRule);
    ctx.body = ctx.request.body;
  }
}

module.exports = UserController;

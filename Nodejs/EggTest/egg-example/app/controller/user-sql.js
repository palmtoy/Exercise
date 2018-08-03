'use strict';

const Controller = require('egg').Controller;

class UserSqlController extends Controller {
  async users() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.userSql.list(ctx.query);
  }

  async user() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.userSql.find(ctx.params.id);
  }

  async create() {
    const ctx = this.ctx;
    const created = await ctx.service.userSql.create(ctx.request.body);
    ctx.status = 201;
    ctx.body = created;
  }

  async update() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    const body = ctx.request.body;
    ctx.body = await ctx.service.userSql.update({ id, updates: body });
  }

  async del() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    await ctx.service.userSql.del(id);
    ctx.status = 200;
  }
}

module.exports = UserSqlController;

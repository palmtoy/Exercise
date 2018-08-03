'use strict';

const Service = require('egg').Service;

class UserSql extends Service {
  async list({ offset = 0, limit = 10, order_by = 'created_at', order = 'ASC' }) {
    return this.ctx.model.UserSql.findAndCountAll({
      offset,
      limit,
      order: [[ order_by, order.toUpperCase() ]],
    });
  }

  async find(id) {
    const userSql = await this.ctx.model.UserSql.findById(id);
    if (!userSql) {
      this.ctx.throw(404, 'userSql not found');
    }
    return userSql;
  }

  async create(userSql) {
    return this.ctx.model.UserSql.create(userSql);
  }

  async update({ id, updates }) {
    const userSql = await this.ctx.model.UserSql.findById(id);
    if (!userSql) {
      this.ctx.throw(404, 'userSql not found');
    }
    return userSql.update(updates);
  }

  async del(id) {
    const userSql = await this.ctx.model.UserSql.findById(id);
    if (!userSql) {
      this.ctx.throw(404, 'userSql not found');
    }
    return userSql.destroy();
  }
}

module.exports = UserSql;

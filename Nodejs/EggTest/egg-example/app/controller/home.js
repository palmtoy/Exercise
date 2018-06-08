'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  // curl -L http://localhost:7001
  async index() {
    this.ctx.body = new Date().toLocaleString() + ' ~ Hello world!';
  }
}

module.exports = HomeController;

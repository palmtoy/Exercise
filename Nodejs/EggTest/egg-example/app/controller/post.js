'use strict';

const Controller = require('../core/base-controller');

class PostController extends Controller {
  async list() {
    const posts = new Date() + ' ~ Hi Postman';
    this.success(posts);
  }
}

module.exports = PostController;

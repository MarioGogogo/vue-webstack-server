'use strict';

const { Controller } = require('egg');

class HomeController extends Controller {
  // 最基础的请求
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
}

module.exports = HomeController;

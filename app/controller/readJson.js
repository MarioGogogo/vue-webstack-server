'use strict';

const { Controller } = require('egg');
const fs = require('fs');
const path = require('path');
class ReadJsonController extends Controller {
  // 最基础的请求
  async read1000() {
    const { ctx, app } = this;
    const fileName = 'generated.json'; // JSON 文件路径
    const filePath = path.resolve(app.config.static.dir, fileName);
    try {
      const data = fs.readFileSync(filePath, 'utf8'); // 读取 JSON 文件内容
      ctx.body = { status: 200, data: JSON.parse(data) }; // 将 JSON 数据作为响应返回
    } catch (err) {
      console.error(err);
      ctx.response.body = 'Error reading JSON file'; // 处理读取文件出错的情况
      ctx.response.status = 500;
    }
  }
  async read10000() {
    const { ctx } = this;
    ctx.body = { status: 400, data: '还在开发中....' }; // 将 JSON 数据作为响应返回
  }
}

module.exports = ReadJsonController;

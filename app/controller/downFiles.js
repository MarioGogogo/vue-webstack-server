'use strict';

const { Controller } = require('egg');
const fs = require('fs');
const path = require('path');

class DownFilesController extends Controller {
  // 最基础的请求
  async download() {
    const { ctx, app } = this;
    const fileName = 'app.zip';
    const filePath = path.resolve(app.config.static.dir, fileName);
    console.log('%c Line:13 🍬 filePath', 'font-size:18px;color:#ffffff;background:#6666FF', filePath);
    // ctx.attachment([filename], [options]) 将 Content-Disposition 设置为 “附件” 以指示客户端提示下载。
    ctx.attachment(fileName, {
      fallback: true,
      type: 'attachment', // [string] attachment/inline
    });
    const fileSize = fs.statSync(filePath).size;
    ctx.response.set({
      'Content-Type': 'application/octet-stream',
      'Access-Control-Expose-Headers': 'Content-Disposition', // 这段必须加上否则vue请求axios 无法获取Content-Disposition
      'Content-Disposition': `attachment; filename=${fileName}`,
      'Content-Length': fileSize,
    });
    ctx.body = fs.createReadStream(filePath);
  }
  async downloadImageUrl() {
    const { ctx, app } = this;
    const fileName = '1200526.jpg';
    const filePath = path.resolve(app.config.static.dir, fileName);
    // 文件下载
    // const res = await this.ctx.curl(url, {
    //   streaming: true,
    // });
    ctx.type = 'jpg';
    ctx.set('content-type', 'image/jpeg');
    ctx.body = fs.createReadStream(filePath);
  }
  async downloadImage() {
    const { ctx, app } = this;
    const fileName = '1200526.jpg';
    const filePath = path.resolve(app.config.static.dir, fileName);
    ctx.type = 'jpg';
    ctx.attachment(fileName, {
      fallback: true,
      type: 'attachment', // [string] attachment/inline
    });
    const fileSize = fs.statSync(filePath).size;
    ctx.response.set({
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment; filename=${fileName}`,
      'Content-Length': fileSize,
    });
    ctx.body = fs.createReadStream(filePath);
  }
}

module.exports = DownFilesController;

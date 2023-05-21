// app/middleware/gzip.js
const isJSON = require('koa-is-json');
const zlib = require('zlib');

module.exports = (options, app) => {
  console.log('%c Line:6 🍿 中间件传值', 'font-size:18px;color:#ffffff;background:#c23616', options);
  return async function gzip(ctx, next) {
    await next();
    // 后续中间件执行完成后将响应体转换成 gzip
    let body = ctx.body;
    if (!body) return;

    // 支持 options.threshold
    if (options.threshold && ctx.length < options.threshold) return;
    if (isJSON(body)) body = JSON.stringify(body);
    // 设置 gzip body，修正响应头
    const stream = zlib.createGzip();
    stream.end(body);
    ctx.body = stream;
    console.log('%c Line:20 🍓 启动中间件', 'font-size:18px;color:#ffffff;background:#c23616');
    ctx.set('Content-Encoding', 'gzip');
  };
};

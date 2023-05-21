// 参数是否错误 中间件

module.exports = (options, app) => {
  // 返回一个异步方法
  return async function paramsErr(ctx, next) {
    // 要效验参数是否正确

    // 获取客户端参数
    const { url } = ctx.request;
    console.log('%c Line:10 🍢 query', 'font-size:18px;color:#ffffff;background:#FFCC99', url.split('/')[2]);
    console.log('%c Line:12 🥝 options.errIDs', 'font-size:18px;color:#ffffff;background:#8c7ae6', options.errIds);
    if (url.split('/')[2] === '123') {
      console.log('符合要求');
      return (ctx.body = {
        code: 400,
        message: `账号id已被禁用 ${url}`,
      });
    }
    await next();

    // 中间件 执行转成 body
  };
};

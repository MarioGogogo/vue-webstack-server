const Joi = require('@hapi/joi');
module.exports = (options, app) => {
  return async function checkParam(ctx, next) {
    console.log('ctx.request.body', ctx.request.body);
    // const { error } = validate(ctx.request.body);
    const schema = Joi.object({
      id: Joi.number().required(),
      name: Joi.string(),
      age: Joi.number(),
    }).unknown(); // 允许出现其他字段;
    const { error } = schema.validate(ctx.request.body);
    console.log(error); // "b" must be [ref:a]
    if (error) {
      return (ctx.body = {
        code: 422,
        message: `参数缺失或不正确,${error.message}`,
      });
    }
    await next();
  };
};

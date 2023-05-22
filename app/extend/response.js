'use strict';

module.exports = {
  /**
   * @description
   * @param {*} { data, status }
   */
  success({ data, status, message }) {
    const { ctx } = this;
    ctx.body = {
      code: '0',
      success: true,
      message: message,
      result: data || null,
      sysTime: ctx.today_now(),
    };
    ctx.status = status || 200;
  },

  /**
   * @description
   * @param {*} { status, code, message, data }
   */
  failure({ status, code, message, data }) {
    const { ctx } = this;
    ctx.body = {
      code: code || '-1',
      success: false,
      message: message || 'no message',
      result: data || null,
      sysTime: ctx.today_now(),
    };
    ctx.status = status || 200;
  },
};

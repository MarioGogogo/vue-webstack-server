module.exports = {
  // 系统错误, -10000级别
  UNKNOWN_ERROR: { code: '-10000', message: 'Internal server error.' }, // 未知错误
  NOT_EXIST_ROUTE: { code: '-10001', message: 'The route does not exist' }, // 路由不存在
  // 上游系统错误 -20000级别
  Up_SYS_TIME_OUT: { code: '-20001', message: 'Upstream system timeout.' }, // 上游系统超时
  // 业务错误，-30000级别
  NOT_LOGIN: { code: '-30001', message: 'Not login.' }, // 未登录
};

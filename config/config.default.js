/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  config.cors = {
    origin: '*', // 允许所有跨域访问，注释掉则允许上面 白名单 访问
    credentials: false, // 允许跨域请求携带cookies
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };
  // 关闭安全策略
  config.security = {
    csrf: {
      enable: false,
    },
  };
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1679679944336_8226';

  // 在这里添加你的中间件配置
  // config.middleware = ['gzip', 'paramsErr'];
  // TODO:文件下载不能用gzip中间件去判断 这里下次优化
  config.middleware = ['paramsErr'];
  config.gzip = {
    threshold: 1024, // 小于 1k 的响应体不压缩
  };

  config.paramsErr = {
    errIds: ['123', '456'],
  };

  // 配置mongoose数据库
  config.mongoose = {
    client: {
      // 有用户名和密码的数据库的连接方式
      url: 'mongodb://43.134.241.119:8082/webgps',
      options: {
        auth: { authSource: 'admin' },
        user: 'user1',
        pass: '123456',
      },
    },
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
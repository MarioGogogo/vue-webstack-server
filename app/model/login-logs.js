/**
 * 登录日志
 * @param {} app
 * @return
 */
module.exports = (app) => {
  // 引入建立连接的mongoose
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  // 数据库表的映射
  const LoginLogsSchema = new Schema({
    username: { type: String },
    status: {
      //登录状态
      type: Number,
      default: 1,
    },
    host: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      default: '获取地址失败',
    },
    client: {
      //客户端
      type: String,
      require: true,
    },
    browser: {
      //浏览器
      type: String,
      require: true,
    },
    created_time: {
      type: Date,
      default: new Date(),
    },
    last_login_time: {
      //登录时间
      type: Date,
      default: new Date(),
    },
    timestamp: {
      type: Date,
      default: new Date().getTime(),
    },
  });
  return mongoose.model('LoginLogs', LoginLogsSchema, 'login_logs');
};

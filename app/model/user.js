// app/model/user.js
/**
 * 用户名
 * @param {} app
 * @return
 */
module.exports = (app) => {
  // 引入建立连接的mongoose
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  // 数据库表的映射
  const UserSchema = new Schema({
    username: { type: String },
    password: { type: String },
    status: {
      type: Number,
      default: 1,
    },
    created_time: {
      type: Date,
      default: new Date(),
    },
    last_login_time: {
      type: Date,
      default: new Date(),
    },
  });
  return mongoose.model('User', UserSchema, 'user');
};

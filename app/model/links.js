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
  const LinksSchema = new Schema({
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    des: {
      type: String,
      default: '这是一条默认描述',
    },
    categoryId: {
      type: String,
      ref: 'Category',
    }, // 关联category 中的id
    status: {
      type: Number,
      default: 1,
    },
    created_time: {
      type: Date,
      default: new Date(),
    },
    updated_time: {
      type: Date,
      default: new Date(),
    },
  });
  const AutoIncrement = require('mongoose-sequence')(mongoose);
  LinksSchema.plugin(AutoIncrement, { inc_field: 'links_seq' });
  return mongoose.model('Links', LinksSchema, 'links');
};

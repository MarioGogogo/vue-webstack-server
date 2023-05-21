module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const CategorySchema = new Schema({
    category_name: {
      type: String,
      required: true,
    },
    icon_name: {
      type: String,
      required: true,
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
  CategorySchema.plugin(AutoIncrement, { inc_field: 'category_seq' });
  return mongoose.model('Category', CategorySchema, 'category');
};

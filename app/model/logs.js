module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const LogsSchema = new Schema({
    timestamp: {
      //时间
      type: String,
      require: true,
    },
    projectName: {
      type: String,
      require: true,
    },
    host: {
      type: String,
      require: true,
    },
    url: {
      type: String,
      require: true,
    },
    userAgent: {
      type: String,
      require: true,
    },
    client: {
      type: String,
      require: true,
    },
    borwser: {
      type: String,
      require: true,
    },
    type: {
      type: String,
      require: true,
    },
    errorType: {
      type: String,
      require: true,
    },
    request: {
      type: String,
    },
    response: {
      type: String,
    },
    message: {
      type: String,
    },
    filename: {
      type: String,
    },
    lineno: {
      type: String,
    },
    colno: {
      type: String,
    },
    error: {
      type: Object,
    },
  });
  return mongoose.model('Logs', LogsSchema, 'logs');
};

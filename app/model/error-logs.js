module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const ErrorLogsSchema = new Schema({
    timestamp: {
      type: String,
      require: true,
    },
    reportTime: {
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
    userName: {
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
    browser: {
      type: String,
      require: true,
    },
    type: {
      type: String,
      require: true,
    },
    errorType: {
      type: String,
    },
    message: {
      type: String,
    },
    filename: {
      type: String,
    },
    tagName: {
      type: String,
    },
    selector: {
      type: String,
    },
    stack: {
      type: String,
    },
    lineno: {
      type: String,
    },
    colno: {
      type: String,
    },
  });
  return mongoose.model('ErrorLogs', ErrorLogsSchema, 'error_logs');
};

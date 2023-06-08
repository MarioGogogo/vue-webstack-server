module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const ActionLogsSchema = new Schema({
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
    pathname: {
      type: String,
    },
    status: {
      type: String,
    },
    duration: {
      type: String,
    },
    request: {
      type: String,
    },
    response: {
      type: String,
    },
    method: {
      type: String,
    },
  });
  return mongoose.model('ActionLogs', ActionLogsSchema, 'action_logs');
};

module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const LogsSchema = new Schema({
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
    eventType: {
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
    inputDelay: {
      type: String,
    },
    duration: {
      type: String,
    },
    startTime: {
      type: String,
    },
    selector: {
      type: String,
    },
    connectTime: {
      type: String,
    },
    ttfbTime: {
      type: String,
    },
    responseTime: {
      type: String,
    },
    parseDOMTime: {
      type: String,
    },
    domContentLoadedTime: {
      type: String,
    },
    timeToInteractive: {
      type: String,
    },
    loadTIme: {
      type: String,
    },
    firstPaint: {
      type: String,
    },
    firstContentfulPaint: {
      type: String,
    },
    firstMeaningfulPaint: {
      type: String,
    },
    largestContentfulPaint: {
      type: String,
    },
  });
  return mongoose.model('Logs', LogsSchema, 'logs');
};

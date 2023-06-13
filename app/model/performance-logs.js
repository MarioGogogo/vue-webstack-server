module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const PerformanceLogsSchema = new Schema({
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
    inputDelay: {
      type: String,
    },
    duration: {
      type: String,
    },
    startTime: {
      type: String,
    },
    eventType: {
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
  return mongoose.model('PerformanceLogs', PerformanceLogsSchema, 'performance_logs');
};

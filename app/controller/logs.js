'use strict';

const { Controller } = require('egg');
const fs = require('fs');
const path = require('path');
const { format } = require('date-fns');
class LogsController extends Controller {
  // 最基础的请求
  async writeLogs() {
    const { ctx } = this;
    //获取请求客户IP
    //========================存入数据库=================================
    const header = ctx.request.header;
    const request = JSON.parse(ctx.request.body);
    const body = request.__logs__[0];
    console.log('%c Line:16 🍭 body', 'font-size:18px;color:#ffffff;background:#8c7ae6', body);
    const data = {
      timestamp: body.timestamp,
      reportTime: body.reportTime,
      projectName: body.projectName,
      host: header.host,
      url: body.url,
      userAgent: body.userAgent,
      client: body.client,
      browser: body.browser,
      type: body.type,
      userName: body.userName,
    };
    let params = {};
    switch (body.type) {
      case 'error':
        params = insertErrorData(body, data);
        ctx.model.ErrorLogs(params).save();
        break;
      case 'xhr':
        params = insertHttpData(body, data);
        ctx.model.ActionLogs(params).save();
        break;
      case 'performance':
        params = insertPerformanceData(body, data);
        ctx.model.PerformanceLogs(params).save();
        break;
    }
    // await ctx.model.Logs(params).save();
    //========================存入文本=================================
    let insert_option = {
      writeConcern: {
        w: 2,
        j: true,
        wtimeout: 10000,
      },
    };
    //写日志
    // 日志目录
    const logDir = path.join(__dirname, '../logs/');

    // 如果日志目录不存在，则创建目录
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir);
    }
    // 获取当前日期和时间并格式化为指定格式
    const currentDate = new Date();
    //yyyy-MM-dd-HH-mm-ss
    const fileName = format(currentDate, 'yyyy-MM-dd') + '.log';
    // 将日志信息写入文件
    const logData = JSON.stringify(ctx.request.body);
    // const logFile = path.join(logDir, fileName);
    // fs.appendFileSync(logFile, logData);

    //0️⃣一只方法
    let options = {
      flags: 'a', //w 文件会覆盖  a 文件末尾继续写入
      encoding: 'utf8', // utf8编码
      highWaterMark: 1024, //最高水位线
    };

    let stream = fs.createWriteStream(logDir + '/' + fileName, options);
    stream.write(logData + '\n');
    // BUG:关闭可写流 这个注释掉就不会出现: master uncaughtException: Error: write EPIPE
    // stream.end();
    ctx.body = 'hi,egg!';
  }

  async readLogs() {
    const { ctx } = this;
    const { page = 1, type } = ctx.request.body;
    const pageSize = 10;
    const currentPage = parseInt(page);
    let total = 0;
    let logData = [];

    if (type === 'error') {
      total = await ctx.model.ErrorLogs.countDocuments();
      logData = await ctx.model.ErrorLogs.find({}, '-__v')
        .sort({ timestamp: -1 }) // 按照日期降序排列数据
        .skip((currentPage - 1) * pageSize) // 跳过前面的数据
        .limit(pageSize); // 限制只返回指定数量的数据
    } else if (type === 'xhr') {
      total = await ctx.model.ActionLogs.countDocuments();
      logData = await ctx.model.ActionLogs.find({}, '-__v')
        .sort({ timestamp: -1 }) // 按照日期降序排列数据
        .skip((currentPage - 1) * pageSize) // 跳过前面的数据
        .limit(pageSize); // 限制只返回指定数量的数据
    } else if (type === 'performance') {
      total = await ctx.model.PerformanceLogs.countDocuments();
      logData = await ctx.model.PerformanceLogs.find({}, '-__v')
        .sort({ timestamp: -1 }) // 按照日期降序排列数据
        .skip((currentPage - 1) * pageSize) // 跳过前面的数据
        .limit(pageSize); // 限制只返回指定数量的数据
    }
    // console.log(logData);
    ctx.response.success({ data: { data: logData, total }, message: '读取日志成功' });
  }

  async readLoginLogs() {
    const { ctx } = this;
    const pageSize = 10; // 每页显示数量
    let page = 1; // 当前页码
    const query = {}; // 查询条件
    const request = ctx.request.body;
    page = request.page;
    const total = await ctx.model.LoginLogs.countDocuments({});
    const logData = await ctx.model.LoginLogs.find({}, '-__v')
      .sort({ timestamp: -1 }) // 根据日期降序排列
      .skip((page - 1) * pageSize) // 跳过前面的数据
      .limit(pageSize) // 取出指定数量的数据
      .exec();
    ctx.response.success({ data: { data: logData, total: total }, message: '读取日志成功' });
  }
}

function insertErrorData(body, data) {
  let params = {};
  if (body.errorType === 'resourceError') {
    params = Object.assign(data, {
      errorType: body.errorType,
      filename: body.filename,
      tagName: body.tagName || '',
      selector: body.selector || '',
    });
  } else if (body.errorType === 'jsError' || body.errorType === 'promiseError') {
    params = Object.assign(data, {
      errorType: body.errorType,
      message: body.message,
      filename: body.filename,
      lineno: body.lineno,
      colno: body.colno,
      stack: body.stack,
      selector: body.selector || '',
    });
  } else if (body.errorType === 'vueError') {
    params = Object.assign(data, {
      errorType: body.errorType,
      message: body.message,
    });
  }
  return params;
}

function insertHttpData(body, data) {
  return Object.assign(data, {
    eventType: body.eventType,
    pathname: body.pathname, //请求路径
    status: body.status, //状态码
    duration: body.duration, //持续时间
    response: body.response,
    request: body.request,
    method: body.method,
  });
}

function insertPerformanceData(body, data) {
  let params = {};
  if (body.eventType === 'firstInputDelay') {
    params = Object.assign(data, {
      eventType: body.eventType, //首次输入延迟
      inputDelay: body.inputDelay, //延时的时间
      duration: body.duration, //处理的时间
      startTime: body.startTime,
      selector: body.selector,
    });
  } else if (body.eventType === 'timing') {
    params = Object.assign(data, {
      eventType: body.eventType,
      connectTime: body.connectTime, //连接时间
      ttfbTime: body.ttfbTime, //首字节到达时间
      responseTime: body.responseTime, //响应的读取时间
      parseDOMTime: body.parseDOMTime, //DOM解析的时间
      domContentLoadedTime: body.domContentLoadedTime,
      timeToInteractive: body.timeToInteractive, //首次可交互时间
      loadTIme: body.loadTIme, //完整的加载时间
    });
  } else if (body.eventType === 'paint') {
    params = Object.assign(data, {
      eventType: body.eventType, //统计每个阶段的时间
      firstPaint: body.firstPaint,
      firstContentfulPaint: body.firstContentfulPaint,
      firstMeaningfulPaint: body.firstMeaningfulPaint,
      largestContentfulPaint: body.largestContentfulPaint,
    });
  }
  return params;
}

module.exports = LogsController;

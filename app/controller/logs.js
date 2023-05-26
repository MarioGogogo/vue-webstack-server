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
    const request = JSON.parse(ctx.request.body);
    const body = request.__logs__[0];
    console.log('%c Line:16 🍭 body', 'font-size:18px;color:#ffffff;background:#8c7ae6', body);
    const data = {
      timestamp: body.timestamp,
      reportTime: body.reportTime,
      projectName: body.projectName,
      host: ctx.req.socket.remoteAddress,
      url: body.url,
      userAgent: body.userAgent,
      client: body.client,
      browser: body.browser,
      type: body.type,
    };
    let params = {};
    switch (body.type) {
      case 'error':
        params = insertErrorData(body, data);
        break;
      case 'xhr':
        params = insertHttpData(body, data);
        break;
      case 'performance':
        params = insertPerformanceData(body, data);
        break;
    }
    let insert_option = {
      writeConcern: {
        w: 2,
        j: true,
        wtimeout: 10000,
      },
    };
    await ctx.model.Logs(params).save();

    //========================存入文本=================================
    //写日志
    // 日志目录
    const logDir = path.join(__dirname, 'logs');
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
    let stream = fs.createWriteStream(__dirname + '/logs/' + fileName, options);
    stream.write(logData + '\n');
    // BUG:关闭可写流 这个注释掉就不会出现: master uncaughtException: Error: write EPIPE
    // stream.end();
    ctx.body = 'hi,egg!';
  }

  async readLogs() {
    const { ctx } = this;
    // 获取当前日期和时间并格式化为指定格式
    //=====================读取数据库的方式===========
    const logData = await ctx.model.Logs.find({}, '-__v');
    //=====================读取文件的方式1===========
    const currentDate = new Date();
    //yyyy-MM-dd-HH-mm-ss
    // const fileName = format(currentDate, 'yyyy-MM-dd') + '.log';
    // // 日志文件路径
    // const logFile = path.join(__dirname + '/logs', fileName);
    // // 读取日志文件中的内容
    // const logData = fs.readFileSync(logFile, 'utf-8');
    // // console.log(logData);
    ctx.response.success({ data: logData, message: '读取日志成功' });
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

'use strict';

const { Controller } = require('egg');
const fs = require('fs');
const path = require('path');
const { format } = require('date-fns');
class LogsController extends Controller {
  // 最基础的请求
  async writeLogs() {
    const { ctx, app } = this;
    console.log('%c Line:11 🍆 ctx.request', 'font-size:18px;color:#ffffff;background:#FFCCCC', ctx.request);
    console.log('%c Line:11 🍆 ctx.request.body', 'font-size:18px;color:#ffffff;background:#FFCCCC', ctx.request.body);

    //========================存入数据库=================================
    let insert_option = {
      writeConcern: {
        w: 2,
        j: true,
        wtimeout: 10000,
      },
    };
    const data = {
      timestamp: '2021-09-12 12:00:22',
      projectName: ' document.title',
      host: '192.168.2.2',
      url: 'location.href',
      userAgent: 'userAgent.parse(navigator.userAgent).name',
      client: '客户端',
      borwser: '浏览器',
      type: 'error',
      errorType: 'vueError',
      request: '请求接口信息',
      response: '返回接口信息',
      message: '错误信息',
      filename: '异常的资源url',
      lineno: '异常行号',
      colno: '异常列号',
      error: {
        message: '错误信息',
        stack: '错误信息',
      },
    };

    // const result = await ctx.model.Logs.insertOne(data, insert_option);
    // console.log(`Inserted ${result.insertedCount} document`);
    //========================存入文本=================================
    return;
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
    // 关闭可写流
    stream.end();
    ctx.body = 'hi,egg!';
  }

  readLogs() {
    const { ctx } = this;
    // 获取当前日期和时间并格式化为指定格式
    const currentDate = new Date();
    //yyyy-MM-dd-HH-mm-ss
    const fileName = format(currentDate, 'yyyy-MM-dd') + '.log';
    // 日志文件路径
    const logFile = path.join(__dirname + '/logs', fileName);
    // 读取日志文件中的内容
    const logData = fs.readFileSync(logFile, 'utf-8');
    // console.log(logData);
    ctx.response.success({ data: logData, message: '读取日志成功' });
  }
}

module.exports = LogsController;

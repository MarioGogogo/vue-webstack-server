const { Controller } = require('egg');
const { getRealAddress } = require('../utils');

class UserController extends Controller {
  async login() {
    const { ctx } = this;
    // 检查表中是否没有账号,则第一次登录即注册
    const { username, password } = ctx.request.body;
    // 查询
    const doc = await this.ctx.model.User.find({});
    if (!doc.length) {
      this.ctx.model
        .User({
          username,
          password,
        })
        .save();
      ctx.body = {
        code: 200,
        message: '登录成功',
      };
      //TODO:登录日志写入
      this.writeLoginLogs();
    } else {
      // 判断账号密码是否正确
      const doc = await this.ctx.model.User.findOne({ username, password });
      console.log('%c Line:26 🍡 doc', 'font-size:18px;color:#ffffff;background:#CC9966', doc);
      if (!doc) {
        ctx.body = {
          code: 400,
          message: '用户名或密码错误',
        };
      } else {
        ctx.body = {
          code: 200,
          message: '登录成功',
        };
        this.writeLoginLogs();
      }
      //TODO:登录日志写入
    }
  }
  async info() {
    const { ctx } = this;
    // 接口返回的结果
    // this.app.foo();
    // this.ctx.getIP();
    // 假装这是从数据库读取的数据
    // 建议将操作数据库的方法放到service里
    // 建议将操作数据库的方法放到service里
    this.ctx.model
      .User({
        username: 'UserInitName',
        password: 23,
        lastTime: Date.now(),
      })
      .save();

    ctx.body = {
      code: 0,
      message: '增加用户成功',
      data: [],
    };
  }
  async create() {
    const { ctx } = this;
    // console.log('%c Line:18 🫥 ctx.request.body', 'font-size:18px;color:#ffffff;background:#669966', ctx);
    ctx.body = {
      name: `创建成功 ${ctx.request.body.name}`,
    };
  }

  async writeLoginLogs() {
    const { ctx } = this;
    const { username } = ctx.request.body;
    console.log('%c Line:75 🍔 ctx.request', 'font-size:18px;color:#ffffff;background:#6ec1c2', ctx.request);
    const header = ctx.request.header;
    let str = header['sec-ch-ua'] || '';
    let regex = /"(.*?)";/;
    let matchResult = str ? str.match(regex) : [];
    let browser = matchResult[1] || header['user-agent'];
    const platform = header['sec-ch-ua-platform'] || '';
    let address_val = [];
    if (header.host != '127.0.0.1') {
      const address = await getRealAddress(header.host);
      address_val = address.data ? address.data : '获取地址失败';
    }
    const params = {
      username,
      status: 1,
      host: header.host,
      address: address_val[0] + address_val[1],
      client: platform.substring(1, platform.length - 1),
      browser: browser,
    };
    ctx.model.LoginLogs(params).save();
  }
}
module.exports = UserController;

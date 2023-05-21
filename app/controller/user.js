const { Controller } = require('egg');

class UserController extends Controller {
  async login() {
    const { ctx } = this;
    // 检查表中是否没有账号,则第一次登录即注册
    const { username, password } = ctx.request.body;
    console.log('%c Line:8 👩‍🏫 username, password', 'font-size:18px;color:#ffffff;background:#c23616', username, password);
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
      }
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
}
module.exports = UserController;

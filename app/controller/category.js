'use strict';

const { Controller } = require('egg');

class CategoryController extends Controller {
  // 获取全部类别
  async categoryList() {
    const { ctx } = this;
    const doc = await ctx.model.Category.find({}, '-__v');
    console.log('%c Line:10 🍇 doc', 'font-size:18px;color:#ffffff;background:#6666CC', doc);
    ctx.body = {
      code: 200,
      message: '类别数据!',
      data: doc,
    };
  }
  // 新增
  async createCategory() {
    const { ctx } = this;
    const { name, icon } = ctx.request.body;
    // 查询是否重命名
    const doc = await this.ctx.model.Category.findOne({ category_name: name });
    if (!doc) {
      // 添加
      this.ctx.model
        .Category({
          category_name: name,
          icon_name: icon,
        })
        .save();
      ctx.body = {
        code: 200,
        message: '添加类别成功!',
      };
    } else {
      ctx.body = {
        code: 400,
        message: '添加失败,类别名称重复',
      };
    }
  }

  // 修改
  async updateCategory() {
    const { ctx } = this;
    const { name, icon, id } = ctx.request.body;
    // 查询是否重命名
    const doc = await this.ctx.model.Category.updateOne(
      {
        _id: id,
      },
      {
        category_name: name,
        icon_name: icon,
      }
    );
    if (doc.ok === 1 && doc.n === 1) {
      ctx.body = {
        code: 200,
        message: '修改成功',
      };
    } else {
      ctx.body = {
        code: 400,
        message: '修改失败',
      };
    }
  }

  // 删除
  async deleteCategory() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    const doc = await this.ctx.model.Category.deleteOne({
      _id: id,
    });
    console.log('%c Line:75 👩‍🏫 删除类别', 'font-size:18px;color:#ffffff;background:#f368e0', doc);
    // Line:60 🐞 doc { n: 0, ok: 1, deletedCount: 0 }
    if (doc.ok === 1 && doc.n === 1) {
      ctx.response.success({ data: ['test', 'test2'], message: '删除成功' });
    } else {
      ctx.response.failure({ message: '删除失败' });
    }
  }

  // 批量删除
  async bathDeleteCategory() {
    const { ctx } = this;
    const { ids } = ctx.request.body;
    const delete_ids = ids || [];
    try {
      const res = await this.ctx.model.Category.deleteMany({ _id: { $in: delete_ids } });
      console.log('%c Line:93 🍒 res', 'font-size:18px;color:#ffffff;background:#CC9966', res);
      if (doc.ok === 1 && doc.n === 1) {
        ctx.response.success({ data: ['test', 'test2'], message: '批量删除成功' });
      } else {
        ctx.response.failure({ message: '批量删除失败' });
      }
    } catch (error) {
      console.log('%c Line:84 🍔 error', 'font-size:18px;color:#ffffff;background:#1dd1a1', error);
      ctx.response.failure({ message: '批量删除失败' });
    }
  }
}

module.exports = CategoryController;

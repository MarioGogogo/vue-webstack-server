'use strict';

const { Controller } = require('egg');

class LinksController extends Controller {
  // 最基础的请求
  async linksList() {
    const { ctx } = this;
    const { category_id } = ctx.request.body;
    const doc = await ctx.model.Links.find({ categoryId: category_id }, '-__v').populate('categoryId', { category_name: 1, _id: 1 });
    ctx.body = {
      code: 200,
      message: '某个类别下面网址列表数据!',
      data: doc,
    };
  }
  async linksAllList() {
    const { ctx } = this;
    //遍历每一个列表下面多少个连接地址
    const doc = await ctx.model.Links.find({}, '-__v').populate('categoryId', { category_name: 1, _id: 1 });
    //将列表转成hashmap
    const cat_doc = await ctx.model.Category.find({}, '-__v');
    const cat_doc_map = {};
    cat_doc.forEach((item) => {
      cat_doc_map[item._id] = [];
    });
    for (let i = 0; i < doc.length; i++) {
      const { _id } = doc[i].categoryId;
      if (cat_doc_map[_id]) {
        cat_doc_map[_id].push(doc[i]);
      }
    }

    //map转数组
    const list = [];
    for (let i = 0; i < cat_doc.length; i++) {
      const _id = cat_doc[i]['_doc']._id;
      if (cat_doc_map[_id]) {
        list.push({
          ...cat_doc[i]['_doc'],
          web: cat_doc_map[cat_doc[i]._id],
        });
      }
    }
    ctx.body = {
      code: 200,
      message: '全部网址列表数据!',
      data: list,
    };
  }

  async createLinks() {
    const { ctx } = this;
    const { category_id, url, title, icon, des } = ctx.request.body;
    // 查询是否重命名
    const doc = await this.ctx.model.Links.findOne({ title });
    console.log('%c Line:24 🥔 查询是否重命名', 'font-size:18px;color:#ffffff;background:#FF6666', doc);
    if (!doc) {
      // 添加
      try {
        this.ctx.model
          .Links({
            categoryId: category_id,
            title,
            icon,
            url,
            des,
          })
          .save();
        ctx.body = {
          code: 200,
          message: '添加类别成功!',
        };
      } catch (error) {
        console.log('添加-error', error);
      }
    } else {
      ctx.body = {
        code: 400,
        message: '添加失败,名称重复',
      };
    }
  }
  async updateLinks() {
    const { ctx } = this;
    const { title, icon, id, url, des } = ctx.request.body;
    // 查询是否重命名
    const doc = await this.ctx.model.Links.updateOne(
      {
        _id: id,
      },
      {
        title,
        icon,
        url,
        des,
      }
    );
    console.log('%c Line:51 🥐 修改', 'font-size:18px;color:#ffffff;background:#ff6b6b', doc);
    if (doc.ok === 1) {
      ctx.body = {
        code: 200,
        message: '修改成功',
      };
    }
  }
  async deleteLinks() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    await this.ctx.model.Links.deleteOne({
      _id: id,
    });
    ctx.body = {
      code: 200,
      message: '删除成功',
    };
  }
  async bathdeleteLinks() {
    const { ctx } = this;
    const { ids } = ctx.request.body;
    const delete_ids = JSON.parse(ids) || [];
    try {
      await this.ctx.model.Links.deleteMany({ _id: { $in: delete_ids } });
      ctx.body = {
        code: 200,
        message: '批量删除成功',
      };
    } catch (error) {
      console.log('%c Line:84 🍔 error', 'font-size:18px;color:#ffffff;background:#1dd1a1', error);
      ctx.body = {
        code: 400,
        message: '批量删除失败',
      };
    }
  }
}

module.exports = LinksController;

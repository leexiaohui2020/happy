'use strict';
const Controller = require('egg').Controller;

class HomeController extends Controller {

  async index() {
    const { ctx } = this;
    await ctx.redirect('/index.html');
  }

  async cate() {
    const { ctx } = this;
    const cate = await ctx.service.reptile.category();
    ctx.body = { cate };
  }

  async list() {
    const { ctx } = this;
    ctx.validate({
      page: { type: 'int' },
      link: { type: 'string' },
    });
    const list = await ctx.service.reptile.list(ctx.request.body);
    ctx.body = list;
  }

  async image() {
    const { ctx } = this;
    ctx.validate({
      link: { type: 'string' },
      title: { type: 'string' },
    });
    const list = await ctx.service.reptile.image(ctx.request.body);
    ctx.body = list;
  }
}

module.exports = HomeController;

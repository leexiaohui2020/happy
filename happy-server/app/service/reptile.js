'use strict';
const Service = require('egg').Service;
const cheerio = require('cheerio');
const iconv = require('iconv-lite');

class ReptileService extends Service {

  /** 获取分类 */
  async category() {
    return [
      { link: '/html/yazhou/', title: '亚洲人体' },
      { link: '/html/oumeirenti/', title: '欧美人体' },
      { link: '/html/tuijian/', title: '推荐图片' },
      { link: '/html/guomosipai/', title: '国模私拍' },
      { link: '/html/guowaijingpin/', title: '国外精品' },
      { link: '/html/makemodel/', title: '韩国人体' },
      { link: '/html/a4you/', title: 'A4YOU人体' },
    ];
  }

  /**
   * 按分类获取分页
   * @param {Object} opts - 请求参数
   * @param {String} opts.link - 分类链接
   * @param {Number} opts.page - 分页
   */
  async list(opts) {
    const { ctx } = this;
    const { link, page } = opts;
    const url = `http://www.9900rt.com${link}${page > 1 ? `${page}.html` : ''}`;
    const res = await ctx.curl(url);
    if (res.status !== 200) return [];
    const content = iconv.decode(Buffer.from(res.data, 'binary'), 'GBK');
    const $ = cheerio.load(content, { decodeEntities: false });
    const list = [];

    $('.ulPic > li > a').each((i, e) => {
      const link = $(e).attr('href').replace(/\.html$/, '');
      const title = $(e).attr('title');
      const cover = $('img', e).attr('src');
      list.push({ link, title, cover });
    });

    return list;
  }

  /**
   * 获取图片列表
   * @param {Object} opts - 参数
   * @param {String} opts.link - 链接
   * @param {String} opts.title - 标题
   */
  async image(opts) {
    const { ctx } = this;
    const list = [];
    const next = async total => {
      const url = `http://www.9900rt.com${opts.link}${total ? `_${total}` : ''}.html`;
      const { data } = await ctx.curl(url);
      const content = iconv.decode(Buffer.from(data, 'binary'), 'GBK');
      const $ = cheerio.load(content, { decodeEntities: false });

      if (total) {
        const src = $(`a[title="${opts.title}"]:last-child > img`).attr('src');
        // eslint-disable-next-line no-constant-condition
        for (let i = 1; true; i++) {
          const num = i < 10 ? `0${i}` : i;
          const image = src.replace(/\d+\.jpg$/, `${num}.jpg`);
          list.push(image);
          if (image === src) {
            break;
          }
        }
      } else {
        const allA = $('.a1 ~ a:not(.a1)');
        const num = +$(allA[allA.length - 1]).text();
        await next(num);
      }
    };

    await next();
    return list;
  }
}

module.exports = ReptileService;

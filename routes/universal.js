const KoaRouter = require('koa-router');
const HTTP_CONSTANT = require('../http/http-constant');

// 通用接口定义文件
const routerUniversal = new KoaRouter();

// cors pre-check
routerUniversal.options('*', ctx => {
  ctx.response.status = 204;
  ctx.set(HTTP_CONSTANT.HEADERS.ORIGIN, '*');
  ctx.set(HTTP_CONSTANT.HEADERS.HEADERS, 'Content-Type');
  ctx.set(HTTP_CONSTANT.HEADERS.METHODS, 'OPTIONS');
});

// routerUniversal.post('/common/upload',)

module.exports = routerUniversal;
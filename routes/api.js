const KoaRouter = require('koa-router');
const ioHandler = require('../database/ioHandler');
// prefix
const apiRouter = new KoaRouter({prefix: '/api'});

apiRouter.options('*', ctx => {
  ctx.response.status = 204;
  ctx.set('Access-Control-Allow-Origin', 'http://127.0.0.1:8080');
  ctx.set('Access-Control-Allow-Headers', 'content-type');
  ctx.set('Access-Control-Allow-Methods', 'OPTIONS');
})

apiRouter.get('/article/latest', async (ctx, next) => {
  let result = await ioHandler.queryLatestArticle(ctx.query.length || 1);
  ctx.set('Access-Control-Allow-Origin', 'http://127.0.0.1:8080'); // cors
  ctx.response.type = 'application/json';
  ctx.response.body = result;
})
.post('/article/save', async (ctx, next) => {
  let article = ctx.request.body;
  let result = await ioHandler.addArticle(article);

  ctx.set('Access-Control-Allow-Origin', 'http://127.0.0.1:8080'); // cors
  ctx.set('Access-Control-Allow-Methods', 'POST');
  ctx.response.type = 'application/json';
  ctx.response.body = result;
})
.post('/login', async (ctx, next) => {
  let data = ctx.request.body;
  let result = await ioHandler.queryToken(data.token);

  if (result.data.length != 0) {
    ctx.cookies.set('name', 'jiawei', {
      maxAge: 10E3 * 60 * 60 * 24,
      signed: true
    });
  }

  ctx.set('Access-Control-Allow-Origin', 'http://127.0.0.1:8080'); // cors
  ctx.set('Access-Control-Allow-Methods', 'POST');
  ctx.set('Access-Control-Allow-Credentials', true);
  ctx.response.type = 'application/json';
  ctx.response.body = {success: true};
})
.get('/article/detail/:id', async (ctx, next) => {
  let id = ctx.params.id;
  let result = await ioHandler.querySpecificArticle(id);

  ctx.set('Access-Control-Allow-Origin', 'http://127.0.0.1:8080'); // cors
  ctx.response.type = 'application/json';
  ctx.response.body = result;
})

module.exports = apiRouter;
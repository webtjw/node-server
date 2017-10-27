const KoaRouter = require('koa-router');
const BlogDatabase = require('../database/BlogDatabase');
// prefix
const apiRouter = new KoaRouter({prefix: '/api'});

apiRouter.get('/article/latest', async (ctx, next) => {
  let result = await BlogQuery.queryLatestArticle(ctx.query.length || 1);
  ctx.set('Access-Control-Allow-Origin', 'http://127.0.0.1:8080'); // cors
  ctx.response.type = 'application/json';
  ctx.response.body = result;
})
.options('/article/save', (ctx) => {
  ctx.response.status = 204;
  ctx.set('Access-Control-Allow-Origin', 'http://127.0.0.1:8080'); // cors
  ctx.set('Access-Control-Allow-Headers', 'content-type');
  ctx.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  ctx.response.body = '';
})
.post('/article/save', async (ctx, next) => {
  let article = ctx.request.body;
  let result = await BlogDatabase.addArticle(article);

  ctx.set('Access-Control-Allow-Origin', 'http://127.0.0.1:8080'); // cors
  ctx.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  ctx.response.type = 'application/json';
  ctx.response.body = result;
})
.get('/article/:id', async (ctx, next) => {
  let id = ctx.params.id;
  let result = await BlogDatabase.querySpecificArticle(id);

  ctx.set('Access-Control-Allow-Origin', 'http://127.0.0.1:8080'); // cors
  ctx.response.type = 'application/json';
  ctx.response.body = result;
})

module.exports = apiRouter;
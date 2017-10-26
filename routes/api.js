const KoaRouter = require('koa-router');
const BlogQuery = require('../database/BlogQuery');
// prefix
const apiRouter = new KoaRouter({prefix: '/api'});

apiRouter.get('/article/latest', async (ctx, next) => {
  console.log('首页获取最新文章');
  let result = await BlogQuery.queryLatestArticle(ctx.query.length || 1);
  ctx.set('Access-Control-Allow-Origin', 'http://127.0.0.1:8080'); // cors
  ctx.response.type = 'application/json';
  ctx.response.body = result;
})

apiRouter.get('/article/:id', async (ctx, next) => {
  let id = ctx.params.id;
  let result = await BlogQuery.querySpecificArticle(id);

  ctx.set('Access-Control-Allow-Origin', 'http://127.0.0.1:8080'); // cors
  ctx.response.type = 'application/json';
  ctx.response.body = result;
})

module.exports = apiRouter;
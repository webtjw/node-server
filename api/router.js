const KoaRouter = require('koa-router');
// prefix
const apiRouter = new KoaRouter({prefix: '/api'});

apiRouter.get('/article', (context, next) => {
  console.log('article');
  context.request;
  context.response;
})

module.exports = apiRouter;
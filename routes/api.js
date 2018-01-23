const KoaRouter = require('koa-router');
const database = require('../database/database');
const moment = require('moment'); 
const article = require('../modules/article');

// prefix
const apiRouter = new KoaRouter({prefix: '/api'});

// cors pre-check
apiRouter.options('*', ctx => {
  ctx.response.status = 204;
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Headers', 'Content-Type');
  ctx.set('Access-Control-Allow-Methods', 'OPTIONS');
})

apiRouter.post('/article/save', article.saveArticle);
apiRouter.post('/login', article.login);
apiRouter.post('/article/attributes', article.queryAttributes);
apiRouter.post('/article/getIndex', article.queryIndex);
// apiRouter.post('/article/detail', getArticleById);
// apiRouter.post('/article/categories', getAllCategories);
// apiRouter.post('/article/tags', getAllTags);
// apiRouter.post('/article/queryByIndex', queryByIndex);
// apiRouter.post('/article/getHistory', getHistoryArticleByPage);

module.exports = apiRouter;
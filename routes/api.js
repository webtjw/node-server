const KoaRouter = require('koa-router');
const database = require('../database/database');
const moment = require('moment'); 
const {saveArticle, queryAttributes, getIndex, getArticleById, getAllCategories, getAllTags, queryByIndex} = require('../modules/article');

// prefix
const apiRouter = new KoaRouter({prefix: '/api'});

// cors pre-check
apiRouter.options('*', ctx => {
  ctx.response.status = 204;
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Headers', 'content-type');
  ctx.set('Access-Control-Allow-Methods', 'OPTIONS');
})

apiRouter.post('/article/save', saveArticle);
apiRouter.post('/article/attributes', queryAttributes);
apiRouter.post('/article/index', getIndex);
apiRouter.post('/article/detail', getArticleById);
apiRouter.post('/article/categories', getAllCategories);
apiRouter.post('/article/tags', getAllTags);
apiRouter.post('/article/queryByIndex', queryByIndex);
apiRouter.get('/jiawei.js', (ctx, next) => {
  let {request} = ctx;
  ctx.response.status = 200;
  ctx.response.type = 'application/javascript';
  ctx.response.body = 'alert("hello")'
});

module.exports = apiRouter;
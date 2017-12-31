const KoaRouter = require('koa-router');
const database = require('../database/database');
const moment = require('moment'); 
const {saveArticle, queryAttributes, getIndex, getArticleById} = require('../modules/article');

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

module.exports = apiRouter;
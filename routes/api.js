const KoaRouter = require('koa-router');
const database = require('../database/database');
const moment = require('moment');
// prefix
const apiRouter = new KoaRouter({prefix: '/api'});

// cors pre-check
apiRouter.options('*', ctx => {
  ctx.response.status = 204;
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Headers', 'content-type');
  ctx.set('Access-Control-Allow-Methods', 'OPTIONS');
})

apiRouter.get('/article/latest', async (ctx, next) => {
  let result = await database.queryLatestArticle(ctx.query.length || 1);
  ctx.set('Access-Control-Allow-Origin', 'http://127.0.0.1:8080'); // cors
  ctx.response.type = 'application/json';
  ctx.response.body = result;
})
.post('/login', async (ctx, next) => {
  let data = ctx.request.body;
  let result = await database.queryToken(data.token);
  

  ctx.set('Access-Control-Allow-Origin', '*'); // cors
  ctx.set('Access-Control-Allow-Methods', 'POST');
  ctx.set('Access-Control-Allow-Credentials', true);
  ctx.response.type = 'application/json';

  // one of the developer in db
  if (result.success && result.data.length == 1) {
    let developer = result.data[0];
    if (developer.name && developer.token) {
      ctx.response.body = {success: true};
      // 身份秘钥算法因素：ip name token date
    }
  } else {
    ctx.response.body = {
      success: false,
      errorMsg: '口令有误，请检查你的输入'
    };
  }
  
})
.get('/article/detail/:id', async (ctx, next) => {
  let id = ctx.params.id;
  let result = await database.querySpecificArticle(id);

  ctx.set('Access-Control-Allow-Origin', 'http://127.0.0.1:8080'); // cors
  ctx.response.type = 'application/json';
  ctx.response.body = result;
})


/**
 * @param article: Object
 * @param article.id: Number
 * @param article.title: required String
 * @param article.author: String
 * @param article.category: required String
 * @param article.tags: required Array
 * @param article.codeText: required String
 */
apiRouter.post('/article/save', async (ctx, next) => {
  ctx.set('Access-Control-Allow-Methods', 'POST');
  ctx.response.type = 'application/json';
  
  let article = ctx.request.body;
  let {title, tags, codeText, category, id} = article;
  let result = null;
  
  if (title && tags && tags.length > 0 && codeText && category) {
    article.time = moment().format('YYYY-MM-D'); // yyyy-mm-dd

    // If id exists, it means adding article.
    // Otherwise it is editing article. The return result contains the previous article's category and tags, so I can use them to compare with new's to get the number.
    if (!id) {
      result = await database.addArticle(article);
    }
    else result = await database.updateArticle(article);




  } else {
    ctx.
  }

  
  ctx.response.type = 'application/json';
  ctx.response.body = {
    success: result.success,
    data: result.success ? {id: result.data.insertId} : result.data
  };
})

module.exports = apiRouter;
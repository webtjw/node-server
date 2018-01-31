const KoaRouter = require('koa-router');
const article = require('../modules/article');
let router = require('./router');

// prefix
const prefix = '/api';

routerArticle.post('/article/save', article.saveArticle);
routerArticle.post('/article/login', article.login);
routerArticle.post('/article/attributes', article.queryAttributes);
routerArticle.post('/article/getIndex', article.queryIndex);
routerArticle.post('/article/detail', article.getArticleById);
routerArticle.post('/article/categories', article.queryCategories);
routerArticle.post('/article/tags', article.queryAllTags);
routerArticle.post('/article/queryByIndex', article.queryByIndex);
routerArticle.post('/article/getHistory', article.getHistory);

module.exports = routerArticle;
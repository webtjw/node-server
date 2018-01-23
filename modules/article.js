const moment = require('moment');
const database = require('../database/database');
const {TABLE_NAME_ARTICLE, TABLE_NAME_CATE} = require('../database/dbConfig');




let article = {};

const queryIndex = require('./article/queryIndex'); // 首页三个类型的文章概要集合
article.queryIndex = queryIndex;

const saveArticle = require('./article/saveArticle'); // 保存文章：新增和编辑
article.saveArticle = saveArticle;
article.queryIndex = queryIndex;

const queryAttributes = require('./article/queryAttributes'); // 保存文章：查询所有的分类和标签
article.queryAttributes = queryAttributes;

const login = require('./article/login'); // 保存文章：查询所有的分类和标签
article.login = login;

const queryCategories = require('./article/queryCategories'); // 分类首页：查询所有分类
article.queryCategories = queryCategories;

const queryAllTags = require('./article/queryAllTags'); // 标签首页：查询所有标签
article.queryAllTags = queryAllTags;
article.queryCategories = queryCategories;

const getArticleById = require('./article/getArticleById'); // 文章详情
article.getArticleById = getArticleById;












let queryByIndex = async (ctx, next) => {
  ctx.set('Access-Control-Allow-Methods', 'POST');
  ctx.response.type = 'application/json';

  let result = await queryByIndexHandler(ctx.request.body);

  ctx.response.body = result;
}

let queryByIndexHandler = async (params) => {
  let {queryType, value, number, index} = params;
  let columnName = '';

  if (queryType === TABLE_NAME_CATE) columnName = TABLE_NAME_CATE;
  else if (queryType === 'tags') {
    columnName = 'tags';
  }
  else return {success: false, message: 'wrong type of query'}

  let result = await database.queryByIndex(columnName, value, number, index);
  let sum = await database.querySumOfTable(TABLE_NAME_ARTICLE, columnName, value);
  let data = {
    sum: sum.data,
    list: result.data
  }
  result.data = data;

  return result;
}

let getHistoryArticleByPage = async (ctx, next) => {
  let {index, size} = ctx.request.body;
  let result = null;

  if (index && size && index > 0 && size > 1) {
    let qrs = await database.queryHistoryArticle(index, size);
    result = qrs;
  } else {
    result = {success: false, data: null, message: 'wrong params'}
  }

  ctx.set('Access-Control-Allow-Methods', 'POST');
  ctx.response.type = 'application/json';
  ctx.response.body = result;
}

module.exports = article;

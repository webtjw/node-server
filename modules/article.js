const moment = require('moment');
const database = require('../database/database');
const {TABLE_NAME_ARTICLE, TABLE_NAME_CATE} = require('../database/dbConfig');

const showdown = require('showdown'),
  converter = new showdown.Converter({
    omitExtraWLInCodeBlocks: true, // 省略代码块的新尾行
    strikethrough: true // 支持语法 ~~删除内容~~
  });


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
article.queryAttributes = queryAttributes;

const queryCategories = require('./article/queryCategories'); // 分类首页：查询所有分类
article.queryCategories = queryCategories;






let getArticleById = async (ctx, next) => {
  ctx.set('Access-Control-Allow-Methods', 'POST')
  ctx.response.type = 'application/json';

  let result = await getArticleByIdHandler(ctx.request.body.id);

  ctx.response.status = 200;
  ctx.response.body = result;
}

let getArticleByIdHandler = async (id) => {
  if (id !== undefined && typeof id === 'number' && id >= 0) {
    let result = await database.query(`select * from article where id=${id}`)
    if (result && result.success && Array.isArray(result.data)) {
      result.data = result.data[0]
      result.data.tags = result.data.tags.split(',')
      
      result.data.codeText = converter.makeHtml(result.data.codeText)
    }
    
    return result
  }
}



let getAllTags = async (ctx, next) => {
  ctx.set('Access-Control-Allow-Methods', 'POST');
  ctx.response.type = 'application/json';

  let result = await getAllTagsHandler();

  ctx.response.body = result;
}

let getAllTagsHandler = async () => {
  let result1 = await database.queryTags();
  return result1
}

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

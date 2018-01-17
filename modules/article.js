const moment = require('moment');
const database = require('../database/database');
const {TABLE_NAME_ARTICLE, TABLE_NAME_CATE} = require('../database/dbConfig');


let saveArticle = async (ctx, next) => {

  ctx.set('Access-Control-Allow-Methods', 'POST');
  ctx.response.type = 'application/json';

  let result = saveArticleHandler(ctx.request.body);

  ctx.response.body = {
    success: result.success,
    data: result.success ? {id: result.data.id} : result.data
  };
}

/**
 * pure function for saving article(including additions & edits)
 * @param article: Object
 * @param article.id: Number
 * @param article.title: required String
 * @param article.author: String
 * @param article.category: required String
 * @param article.tags: required Array
 * @param article.codeText: required String
 */
let saveArticleHandler = async function (article) {
  
  let {title, tags, codeText, category, id} = article,
    data = null,
    result = null,
    categoryChange = {},
    tagsChange = {};

  if (title && tags && Array.isArray(tags) && tags.length > 0 && codeText && category) {
    article.time = moment().format('YYYY-MM-D'); // yyyy-mm-dd

    // If id exists, it means adding article.
    // Otherwise it is editing article. The return result contains the previous article's category and tags, so I can use them to compare with new's to get the number.
    if (!id) {
      result = await database.addArticle(article);

      if (result.success) {
        categoryChange[category] = 1;
        tags.forEach(item => tagsChange[item] = 1);
      }
    } else {
      result = await database.updateArticle(article);

      if (result.success && result.origin) {
        if (result.origin.category !== category) {
          categoryChange[category] = 1;
          categoryChange[result.origin.category] = -1;
        }

        tags.forEach(item => tagsChange[item] = 1);
        result.origin.tags.split(',').forEach(item => {
          if (tagsChange[item]) delete tagsChange[item];
          else tagsChange[item] = -1;
        })
      }
    }

    // meanwhile, update other 2 table
    if (result.success) {
      database.updateCategory(categoryChange);
      database.updateTags(tagsChange);

      return {
        success: true,
        data: {id: result.data.insertId},
        message: 'Save successfully'
      }
    } else {
      return {
        success: false,
        data: null,
        message: 'Save failed'
      }
    }
  } else data = {
    success: false,
    data: null,
    message: 'wrong params'
  }
}

let queryAttributes = async (ctx, next) => {
  ctx.set('Access-Control-Allow-Methods', 'POST');
  ctx.response.type = 'application/json';

  let {categories, tags} = await queryAttributesHandler();

  ctx.response.body = {
    success: Boolean(categories && tags),
    data: {categories, tags}
  };
}

let queryAttributesHandler = async () => {
  let result1 = await database.queryCategories();
  let result2 = await database.queryTags();

  return {
    categories: result1.success ? result1.data : null,
    tags: result2.success ? result2.data : null
  }
}

let getIndex = async (ctx, next) => {

  ctx.set('Access-Control-Allow-Methods', 'POST')
  ctx.response.type = 'application/json';

  let result = await getIndexHandler();

  ctx.response.status = 200;
  ctx.response.body = result;
}

let getIndexHandler = async () => {

  let array = [];
  let categories = await database.queryCategories();

  if (categories.success && Array.isArray(categories.data) && categories.data.length > 0) {
    for (let len = categories.data.length, maxSize = 3, i = 0; (i < maxSize && i < len); i++) {
      let name = categories.data[i].name;
      let result = await database.queryArticleByCate(name);

      if (result.success && Array.isArray(result.data) && result.data.length > 0) {
        array.push({
          title: name,
          list: result.data.map(item => {
            item.tags = item.tags.split(',');
            return item;
          })
        })
      }
    }

    return {
      success: true,
      data: array
    };
  }

  return {
    success: false,
    data: null,
    message: 'fail to query'
  }
}

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
    }
    
    return result
  }
}

let getAllCategories = async (ctx, next) => {
  ctx.set('Access-Control-Allow-Methods', 'POST');
  ctx.response.type = 'application/json';

  let result = await getAllCategoriesHandler();

  ctx.response.body = result;
}

let getAllCategoriesHandler = async () => {
  let result1 = await database.queryCategories();
  return result1
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

module.exports = {
  saveArticle,
  queryAttributes,
  getIndex,
  getArticleById,
  getAllCategories,
  getAllTags,
  queryByIndex,
  getHistoryArticleByPage
};
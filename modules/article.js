const moment = require('moment');
const database = require('../database/database');

let saveArticle = async (ctx, next) => {
  ctx.set('Access-Control-Allow-Methods', 'POST');
  ctx.response.type = 'application/json';

  let result = await saveArticleHandler(ctx.request.body);

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
  let {title, tags, codeText, category, id} = article;
  let result = null;
  let categoryChange = {};
  let tagsChange = {};

  if (title && tags && tags.length > 0 && Array.isArray(tags) && codeText && category) {
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
    }

    return {
      success: true,
      data: {id: result.data.insertId},
      message: '保存成功'
    }
  } else return {
    success: false,
    data: null,
    message: 'wrong params'
  }
}

let queryTagsAndCategories = async (ctx, next) => {
  ctx.set('Access-Control-Allow-Methods', 'POST');
  ctx.response.type = 'application/json';

  let {categories, tags} = await queryTagsAndCategoriesHandler(ctx.request.body);

  ctx.response.body = {
    success: categories && tags,
    data: {categories, tags}
  };
}

let queryTagsAndCategoriesHandler = async () => {
  let categories = null;
  let tags = null;

  database.query(`select id,name from category`, queryResult => {
    console.log(1)
    if (queryResult.success) categories = queryResult.data;
  })
  console.log(2)
  database.query(`select id,name from tags`, queryResult => {
    if (queryResult.success) tags = queryResult.data;
  })

  return {categories, tags}
}

module.exports = {
  saveArticle,
  queryTagsAndCategories
};
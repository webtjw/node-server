const moment = require('moment');
const database = require('../database/database');


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



module.exports = {
  saveArticle,
  queryAttributes
};
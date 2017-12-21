const moment = require('moment');

let saveArticle = async (ctx, next) => {
  ctx.set('Access-Control-Allow-Methods', 'POST');
  ctx.response.type = 'application/json';

  let result = await saveArticleHandler(ctx.request.body);

  ctx.response.body = {
    success: result.success,
    data: result.success ? {id: result.data.insertId} : result.data
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

  if (title && tags && tags.length > 0 && codeText && category) {
    article.time = moment().format('YYYY-MM-D'); // yyyy-mm-dd

    // If id exists, it means adding article.
    // Otherwise it is editing article. The return result contains the previous article's category and tags, so I can use them to compare with new's to get the number.
    if (!id) {
      result = await database.addArticle(article);

      if (result.success) {
        categoryChange[category] = 1;
      }
    } else {
      result = await database.updateArticle(article);

      if (result.success && result.origin) {
        if (result.origin.category !== category) {
          categoryChange[category] = 1;
          categoryChange[result.origin.category] = -1;
        }
      }
    }

    if (result.success) {
      await database.updateCategory({[category]: 1});
    }




  } else {
    ctx.
  }
}


module.exports = {
  saveArticle
};
const moment = require('moment');
const ctxKit = require('../../../toolkits/ctxKit');
const database = require('../../database/database');


let saveArticle = async (ctx, next) => {
  let result = await saveArticleHandler(ctx.request.body);

  ctxKit.setResponseType('json').setAllowMethod(ctx, 'POST').setResponseCode(200);
  ctx.response.body = {
    success: result.success,
    data: result.success ? {id: result.data.id} : result.data
  };
}

let saveArticleHandler = async (article) => {
  let {title, tags, codeText, category, id} = article,
    data = null,
    result = null,
    categoryChange = {},
    tagsChange = {};

  if (title && tags && Array.isArray(tags) && tags.length > 0 && codeText && category) {
    article.time = moment().format('YYYY-MM-D'); // yyyy-mm-dd

    // 无 id 为新增文章，否则为编辑
    if (!id) {
      result = await database.addArticle(article);

      if (result.success) {
        categoryChange[category] = 1;
        tags.forEach(item => tagsChange[item] = 1);
      }
    } else {
      result = await database.updateArticle(article);
      result.data = result.data[0];
      result.data.insertId = result.data.id;

      if (result.success && result.data) {
        if (result.data.category !== category) {
          categoryChange[category] = 1;
          categoryChange[result.data.category] = -1;
        }

        tags.forEach(item => tagsChange[item] = 1);
        result.data.tags.split(',').forEach(item => {
          if (tagsChange[item]) delete tagsChange[item];
          else tagsChange[item] = -1;
        })
      }
    }

    // 更新类别和标签数目表
    if (result.success) {
      database.updateCategory(categoryChange);
      database.updateTags(tagsChange);

      result.data = {id: result.data.insertId};
      result.message = '保存成功';
    }
    
    return result;
  } else return {
    success: false,
    data: null,
    message: '参数错误'
  }
}

module.exports = saveArticle;

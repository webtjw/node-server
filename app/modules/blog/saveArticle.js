const moment = require('moment');
const httpKit = require('../../toolkits/httpKit');
const database = require('../../database/database');


const saveArticle = async (ctx, next) => {
  const result = await saveArticleHandler(ctx.request.body);

  httpKit.setResponseType(ctx, 'json').setAllowMethod(ctx, 'POST').setResponseCode(ctx, 200);
  ctx.response.body = {
    success: result.success,
    data: result.success ? {id: result.data.id} : result.data
  };
}

const saveArticleHandler = async (article) => {
  const {id, title, tags, description, codeText} = article;
  let data = null;
  let result = null;
  let tagsChange = {};

  if (title && Array.isArray(tags) && tags.length > 0 && codeText) {
    article.time = moment().format('YYYY-MM-D'); // yyyy-mm-dd

    // 无 id 为新增文章，否则为编辑
    if (!id) {
      result = await database.addArticle(article);
      result.success && tags.forEach(item => tagsChange[item] = 1);
    } else {
      result = await database.updateArticle(article);
      result.data = result.data[0];
      result.data.insertId = result.data.id;

      if (result.success && result.data) {
        tags.forEach(item => tagsChange[item] = 1);
        result.data.tags.split(',').forEach(item => {
          if (tagsChange[item]) delete tagsChange[item];
          else tagsChange[item] = -1;
        })
      }
    }

    // 更新类别和标签数目表
    if (result.success) {
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

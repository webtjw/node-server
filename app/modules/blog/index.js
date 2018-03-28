const httpKit = require('../../toolkits/httpKit');
const spots = require('./spots');
const moment = require('moment');

const article = {
  // edit page: get all data in edit page
  async getEditArticleData (ctx, next) {
    const {id} = ctx.request.body;
    const returnValue = {article: null};
    // all tags
    const tagsResult = await spots.getAllTags();
    returnValue.tags = tagsResult.success ? tagsResult.data : [];
    // article
    if (id) {
      const articleResult = await spots.getArticleById(id);
      if (articleResult.success) {
        returnValue.article = articleResult.data[0];
        returnValue.article.tags = returnValue.article.tags.split(',');
      }
    }
    
    httpKit.setResponse(ctx, {data: returnValue});
  },
  // edit page: save article(including the new and modified)
  async saveArticle (ctx, next) {
    const article = ctx.request.body;
    const {id, title, tags, description, codeText} = article;
    article.time = moment().format('YYYY-MM-D'); // formatting as 'yyyy-mm-dd'

    if (title && Array.isArray(tags) && tags.length > 0 && codeText && ((id && /^[0-9]+$/.test(id)) || !id)) {
      const saveResult = await spots.saveArticle(article);
      if (saveResult.success) httpKit.setResponse(ctx, {data: {id: id || saveResult.data.insertId}});
    }
  },
  async getIndexArticle (ctx, next) {
    const size = 5;
    const indexResult = await spots.getIndexArticle(size);
    if (indexResult.success) {
      indexResult.data.forEach(item => {
        item.tags = item.tags.split(',');
      })
      httpKit.setResponse(ctx, {data: indexResult.data});
    }
  },
  async getArticleById (ctx, next) {
    const {id} = ctx.request.body;

    if (id) {
      const articleResult = await spots.getArticleById(id);
      const article = articleResult.data[0];
      article.tags = article.tags.split(',');
      if (articleResult.success) httpKit.setResponse(ctx, {data: article});
    }
  }
}

module.exports = article;

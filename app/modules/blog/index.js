const httpKit = require('../../toolkits/httpKit');
const spots = require('./spots');

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
  }
}

module.exports = article;

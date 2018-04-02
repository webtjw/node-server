const httpKit = require('../../toolkits/httpKit');
const utils = require('../../toolkits/utils');
const spots = require('./spots');
const moment = require('moment');
const cacheTime = 1000 * 60 * 60 * 24; // one day's time to cache

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
  // home page: description list
  async getIndexArticle (ctx, next) {
    const size = 5;
    const indexResult = await spots.getIndexArticle(size);
    if (indexResult.success) {
      indexResult.data.forEach(item => {
        item.tags = item.tags.split(',');
        item.codeText = item.codeText.replace(/^#t\s+([^\n]+)\n*/, '');
      })
      httpKit.setResponse(ctx, {data: indexResult.data});
    }
  },
  // common: get an article
  async getArticleById (ctx, next) {
    const {id} = ctx.request.body;

    if (id) {
      const articleResult = await spots.getArticleById(id);
      const article = articleResult.data[0];
      article.tags = article.tags.split(',');
      article.codeText = article.codeText.replace(/^#t\s+([^\n]+)\n*/, '');
      if (articleResult.success) httpKit.setResponse(ctx, {data: article});
    }
  },
  // tag's index page: get all tags
  async getAllTags (ctx, next) {
    const tagResult = await spots.getAllTags();
    if (tagResult.success) httpKit.setResponse(ctx, {data: tagResult.data});
  },
  // tag item's page
  async getArticleByTag (ctx, next) {
    const {tag, pageIndex, size} = ctx.request.body;
    const defaultSize = 20;
    const result = await spots.getArticleByTag(tag, pageIndex, size || defaultSize);
    if (result.success) httpKit.setResponse(ctx, {data: result.data.map(item => {
      item.tags = item.tags.split(',');
      return item;
    })});
  },
  // archive page: load data
  async getArchive (ctx, next) {
    const {index, size} = ctx.request.body;
    if (index === +index && index >= 0) {
      const result = await spots.getArchive(index, size || 20);

      if (result.success) {
        const data = result.data;
        // recent month / last month / recent year
        const groupingData = {recentMonth: [], lastMonth: [], recentYear: [], overAYear:[]};
        const date = new Date();
        const thisYear = date.getFullYear();
        const thisMonth = date.getMonth() + 1;
        const thisDate = date.getDate();
        
        data.forEach(item => {
          item.tags = item.tags.split(',');
          const [year, month, date] = item.time.split('-');
          const alomostDistance = thisDate - date + (thisMonth - month) * 30 + (thisYear - year) * 365; // days between today
          if (alomostDistance <= 30) groupingData.recentMonth.push(item);
          else if (alomostDistance <= 60) groupingData.lastMonth.push(item);
          else if (alomostDistance <= 365) groupingData.recentYear.push(item);
          else groupingData.overAYear.push(item);
        });

        httpKit.setResponse(ctx, {data: groupingData});
      }
    }
  },
  // login
  async login (ctx, next) {
    const {token} = ctx.request.body
    if (token) {
      const result = await spots.checkLogin(token)
      if (result.success && result.data[0] && result.data[0].name) {
        ctx.cookies.set('developer', true, {
          maxAge: cacheTime,
          httpOnly: true
        });
        httpKit.setResponse(ctx, {data: result.data[0].name});
        return;
      }
    }

    httpKit.setResponse({message: 'unmatched token'});
  },
  async checkLogin (ctx, next) {
    const {cookie} = ctx.request.headers
    const cookieList = utils.parseCookie(cookie);
    httpKit.setResponse(ctx, {data: {isDeveloper: cookieList.developer === 'true'}});
  }
}

module.exports = article;

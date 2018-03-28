const queryIndex = require('./queryIndex');
const queryAttributes = require('./queryAttributes');
const login = require('./login');
const queryCategories = require('./queryCategories');
const queryAllTags = require('./queryAllTags');
const queryByIndex = require('./queryByIndex');
const getHistory = require('./getHistory');
const articleHandle = require('./index');
const {getEditArticleData, saveArticle, getIndexArticle, getArticleById, getAllTags, getArticleByTag} = articleHandle;
// prefix
const prefixArticle = path => `/article${path}`;
// business detail
module.exports = router => {
  router.post(prefixArticle('/save'), saveArticle);
  router.post(prefixArticle('/edit'), getEditArticleData);
  router.post(prefixArticle('/index'), getIndexArticle);
  router.post(prefixArticle('/detail'), getArticleById);
  router.get(prefixArticle('/allTags'), getAllTags);
  router.post(prefixArticle('/getArticleByTag'), getArticleByTag);
  router.post(prefixArticle('/login'), login);
  router.post(prefixArticle('/attributes'), queryAttributes);
  router.post(prefixArticle('/categories'), queryCategories);
  router.post(prefixArticle('/queryByIndex'), queryByIndex);
  router.post(prefixArticle('/getHistory'), getHistory);
}

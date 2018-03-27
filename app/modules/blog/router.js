const queryIndex = require('./queryIndex');
const saveArticle = require('./saveArticle');
const queryAttributes = require('./queryAttributes');
const login = require('./login');
const queryCategories = require('./queryCategories');
const queryAllTags = require('./queryAllTags');
const getArticleById = require('./getArticleById');
const queryByIndex = require('./queryByIndex');
const getHistory = require('./getHistory');
const articleHandle = require('./index');
const {getEditArticleData} = articleHandle;
// prefix
const prefixArticle = path => `/article${path}`;
// business detail
module.exports = router => {
  router.post(prefixArticle('/save'), saveArticle);
  router.post(prefixArticle('/edit'), getEditArticleData);
  router.post(prefixArticle('/login'), login);
  router.post(prefixArticle('/attributes'), queryAttributes);
  router.post(prefixArticle('/getIndex'), queryIndex);
  router.post(prefixArticle('/detail'), getArticleById);
  router.post(prefixArticle('/categories'), queryCategories);
  router.get(prefixArticle('/tags'), queryAllTags);
  router.post(prefixArticle('/queryByIndex'), queryByIndex);
  router.post(prefixArticle('/getHistory'), getHistory);
}

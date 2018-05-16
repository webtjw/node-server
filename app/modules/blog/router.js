const articleHandle = require('./index');
const {getEditArticleData, saveArticle, getIndexArticle, getArticleById, getAllTags, getArticleByTag, getArchive, login, checkLogin} = articleHandle;
// prefix
const prefixArticle = path => `/article${path}`;
// business detail
module.exports = router => {
  router.post(prefixArticle('/save'), saveArticle);
  router.post(prefixArticle('/edit'), getEditArticleData);
  router.get(prefixArticle('/index'), getIndexArticle);
  router.post(prefixArticle('/data'), getArticleById);
  router.get(prefixArticle('/allTags'), getAllTags);
  router.post(prefixArticle('/getArticleByTag'), getArticleByTag);
  router.post(prefixArticle('/getArchive'), getArchive);
  router.post(prefixArticle('/login'), login);
  router.post(prefixArticle('/checkLogin'), checkLogin);
}

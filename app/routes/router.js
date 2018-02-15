const KoaRouter = require('koa-router');
// blog
const queryIndex = require('../modules/blog/queryIndex');
const saveArticle = require('../modules/blog/saveArticle');
const queryAttributes = require('../modules/blog/queryAttributes');
const login = require('../modules/blog/login');
const queryCategories = require('../modules/blog/queryCategories');
const queryAllTags = require('../modules/blog/queryAllTags');
const getArticleById = require('../modules/blog/getArticleById');
const queryByIndex = require('../modules/blog/queryByIndex');
const getHistory = require('../modules/blog/getHistory');
// common
const allowCORS = require('../modules/common/allowCORS');
const uploadAsync = require('../modules/common/uploadAsync');
// external
const getMediaVersion = require('../modules/external/mediaVersion');


let router = new KoaRouter();
/* blog */
const prefixApiRoute = path => `/api${path}`; // api routes
router.post(prefixApiRoute('/article/save'), saveArticle);
router.post(prefixApiRoute('/article/login'), login);
router.post(prefixApiRoute('/article/attributes'), queryAttributes);
router.post(prefixApiRoute('/article/getIndex'), queryIndex);
router.post(prefixApiRoute('/article/detail'), getArticleById);
router.post(prefixApiRoute('/article/categories'), queryCategories);
router.post(prefixApiRoute('/article/tags'), queryAllTags);
router.post(prefixApiRoute('/article/queryByIndex'), queryByIndex);
router.post(prefixApiRoute('/article/getHistory'), getHistory);
/* common */
router.options('*', allowCORS); // cors
router.post(prefixApiRoute('/common/upload_async'), uploadAsync); // upload async
/* external function */
router.get('/media/version', getMediaVersion)

module.exports = router;

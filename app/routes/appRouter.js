const KoaRouter = require('koa-router');
const appRouter = new KoaRouter();

require('../modules/common/router')(appRouter); // blog
require('../modules/blog/router')(appRouter); // blog
require('../modules/wechat/router')(appRouter); // wechat

module.exports = appRouter;

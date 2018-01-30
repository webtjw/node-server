const KoaRouter = require('koa-router');
const HTTP_CONSTANT = require('../http/http-constant');
const 2 = require('../modules/common/uploadAsync');
const allowCORS = require('../modules/common/allowCORS');


// 通用接口定义文件
const routerUniversal = new KoaRouter();

routerUniversal.options('*', allowCORS); // cors
routerUniversal.post('/common/upload_async', uploadAsync); // upload async


module.exports = routerUniversal;

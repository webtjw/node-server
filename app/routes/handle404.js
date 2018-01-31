const ctxKit = require('../../toolkits/ctxKit');

const handle404 = async (ctx, next) => {
  ctxKit.setResponseCode(ctx, 404);

  let path = ctx.request.path;
  // 根据请求 path 决定返回内容
  // 如果是 api 类，返回 json
  // 其他则重定向到 404 页面
  if (path.split('/')[1] === 'api') {
    ctxKit.setResponseType('json');
    ctx.response.body = {success: false, data: null, message: 'interface does not exist'}
  } else {
    ctx.redirect('/404.html');
  }
}

module.exports = handle404;

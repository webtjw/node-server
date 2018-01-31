const httpKit = require('../../toolkits/httpKit');


const allowCORS = (ctx, next) => {
  httpKit.setResponseCode(ctx, 204).setAllowMethod(ctx, 'OPTIONS').setAllowHeader(ctx, 'Content-Type').setAllowOrigin(ctx, '*');
  next();
}

module.exports = allowCORS;
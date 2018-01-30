const ctxKit = require('../../toolkits/ctxKit');


const allowCORS = (ctx, next) => {
  ctxKit.setResponseCode(ctx, 204).setAllowMethod(ctx, 'OPTIONS').setAllowHeader(ctx, 'Content-Type').setAllowOrigin(ctx, '*');
  next();
}

module.exports = allowCORS;
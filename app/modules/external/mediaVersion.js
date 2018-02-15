const httpKit = require('../../toolkits/httpKit');

const getMediaVersion = async (ctx, next) => {
  httpKit.setAllowMethod(ctx, 'GET').setResponseType(ctx, 'json').setResponseCode(ctx, 200);
  ctx.response.body = {version: '0.0.1'};
}

module.exports = getMediaVersion;
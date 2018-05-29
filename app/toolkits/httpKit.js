const httpKit = {
  // mime type
  getResponseType (type) {
    if (type === 'js') return 'application/javascript';
    else if (type === 'text') return 'text/plain';
    else return 'application/json';
  },
  setResponse (ctx, params) {
    const {type, allowMethods, status, data, message, success, credentials} = params;
    if (type) ctx.response.type = httpKit.getResponseType(type);
    if (allowMethods) ctx.set('Access-Control-Allow-Methods', allowMethods || 'POST');
    if (status) ctx.response.status = status;
    if (credentials) ctx.set('Access-Control-Allow-Credentials', credentials);
    
    ctx.response.body = {
      data,
      message: message || '',
      success: success === undefined ? true : success
    };
  }
}

module.exports = httpKit;

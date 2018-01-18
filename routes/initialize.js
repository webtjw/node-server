const path = require('path');

const RouterKit = {
  app: null,
  init (server) {
    if (!server) throw new TypeError('wrong server in router initialization.');

    this.app = server;
    // normal routes
    this.initNormalRouter();
    // statics resources
    this.initStatics();
    // 404 page
    this.init404();
    // error
    this.app.on('error', this.errorDealing);
  },
  initNormalRouter () {
    let apiRouter = require('./api');
    
    const normalRoutesList = [
      require('./index'),
      apiRouter
    ];
    normalRoutesList.map(item => this.app.use(item.routes()))
  },
  init404 () {
    this.app.use(async (ctx, next) => {
      ctx.response.status = 404;
      
      let path = ctx.request.path;
      if (path.split('/')[1] === 'api') {
        ctx.response.type = 'application/json';
        ctx.response.body = {success: false, data: null, message: 'interface does not exist'}
      } else {
        ctx.redirect('/404.html');
      }
    })
  },
  initStatics () {
    this.app.use(require('koa-static')(path.resolve(__dirname, '../statics'), {
      maxage: 1000 * 60 * 60 * 24 * 1 // 1 day
    }));
  },
  errorDealing (err) {
    console.error('server error ===> ', err);
  }
};

module.exports = RouterKit;
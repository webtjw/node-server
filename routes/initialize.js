const path = require('path');

const RouterKit = {
  app: null,
  init (server) {
    if (!server) throw new TypeError('wrong server in router initialization.');

    this.app = server;
    // normal routes
    this.initNormalRouter();
    // static resources
    this.initStatics();
    // 404 page
    this.init404();
    // error
    this.app.on('error', this.errorDealing);
  },
  initNormalRouter () {
    const normalRoutesList = [
      require('./index'),
      require('./api')
    ];
    normalRoutesList.map(item => this.app.use(item.routes()))
  },
  init404 () {
    this.app.use(async (ctx, next) => {
      ctx.response.status = 404;
      ctx.redirect('/404.html');
    })
  },
  initStatics () {
    this.app.use(require('koa-static')(path.resolve(__dirname, '../static'), {
      maxage: 1000 * 60 * 60 * 24 * 1 // 1 day
    }));
  },
  errorDealing (error) {
    console.error('server error ===> ', err);
  }
};
module.exports = RouterKit;
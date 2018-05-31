const next = require('next')
const KoaRouter = require('koa-router')
const ssrApp = next({
  dev: process.env.NODE_ENV === 'development',
  dir: './ssr'
})
const ssrRequestHandler = ssrApp.getRequestHandler()
const ssrKoaRouter = new KoaRouter()

module.exports = function ssrInitialize (app) {
  console.log('===>>> SSR 服务正在开启中')

  ssrApp.prepare().then(err => {
    // index
    ssrKoaRouter.get('*', (ctx, next) => {
      ssrApp.render(ctx.req, ctx.res, '/aa')
      next()
    })
    
    app.use(ssrKoaRouter.routes())
    app.listen(3001)

    console.log('===>>> SSR 服务开启完成')
  })
}
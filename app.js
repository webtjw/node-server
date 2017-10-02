let path = require('path');
global.RootPath = path.resolve('');

// node lib
const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router({prefix: '/api'});

router.all('/jiawei', (context, next) => {
  console.log('jiawei');
})

// custom variable
const port = 8000;
app.use(router.routes());

app.on('error', err => {
  log.error('server error', err)
});

app.listen(port);

// log info
console.log(`Server running at http://127.0.0.1:${port}/`); 
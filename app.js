let path = require('path');
global.RootPath = path.resolve('');

// node lib
const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();


// 中间件列表
app.use(async (context, next) => {
  console.log(1);
  await next();
})

app.use(async (context, next) => {
  console.log(2);
  await next();
  console.log(4);
})

app.use(async (context, next) => {
  console.log(3);
  await next();
  console.log(5);
})

// custom variable
const port = 8000;
app.listen(port);

// log info
console.log(`Server running at http://127.0.0.1:${port}/`); 
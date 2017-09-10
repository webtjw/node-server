// node module
let http = require('http'),
  path = require('path'),
  fs = require('fs');

// custom variable
const port = 8000;

global.RootPath = path.resolve('');

let HtmlMaker = require('./tookits/htmlMaker.js');
HtmlMaker(function (data) {
  console.log(data)
})
console.log('jiawei')

// simple server
const simpleServer = http.createServer((request, response) => {
  console.log(request.url)
  setTimeout(() => {
    response.writeHead(200,{
      'Content-Type': 'text/html'
    })
    response.end(`
      <!doctype html>
      <html>
        <head></head>
        <body>
          <h1>Hello World!</h1>
        </body>
      </html>
    `);
  }, 2000);
}).listen(port);

// log info
console.log(`Server running at http://127.0.0.1:${port}/`); 
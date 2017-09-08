const http = require('http'),
  fs = require('fs');

const port = 8000;

const simpleServer = http.createServer((request, response) => {
  console.log(request.url)
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
});

simpleServer.listen(port);

console.log(`Server running at http://127.0.0.1:${port}/`); 
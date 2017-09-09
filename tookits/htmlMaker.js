let path = require('path'),
  fs = require('fs');

async function HtmlMaker () {
  let doctype = await new Promise((resolve, reject) => {
    fs.readFile(path.join(global.RootPath, '/templates/html5.html'), 'utf8', (err, data) => {
      if (err) {
        reject(err);
        console.log(err);
      }

      resolve(data);
    });
  })
  console.log(doctype)
}

module.exports = HtmlMaker;
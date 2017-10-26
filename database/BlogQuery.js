let mysql = require('mysql');
let DBUtils  = require('./DBUtils');

let pool2blog = mysql.createPool({
  host: 'localhost',
  user: 'tanjiawei',
  password: '123456',
  database: 'blog',
  connectionLimit: 10
});

let BlogQuery = {
  queryLatestArticle (number) {
    return new Promise((resolve, reject) => {
      pool2blog.query(`select * from article order by id desc limit ${number}`, DBUtils.orginizeResult(data => resolve(data)));
    })
  },
  querySpecificArticle (id) {
    return new Promise((resolve, reject) => {
      pool2blog.query(`select * from article where id=${id}`, DBUtils.orginizeResult(data => resolve(data)))
    })
  }
};

module.exports = BlogQuery;
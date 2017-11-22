let mysql = require('mysql');
let DBUtils  = require('./DBUtils');

let pool2blog = mysql.createPool({
  host: 'localhost',
  user: 'tanjiawei',
  password: '123456',
  database: 'blog',
  connectionLimit: 10
});

let BlogDatabase = {
  queryLatestArticle (number) {
    console.log(number)
    return new Promise((resolve, reject) => {
      pool2blog.query(`select * from article order by id desc limit ${number}`, DBUtils.orginizeResult(data => {
        if (data.success) resolve(data);
        else reject(data);
      }));
    }).catch(e => console.log(e))
  },
  querySpecificArticle (id) {
    return new Promise((resolve, reject) => {
      pool2blog.query(`select * from article where id=${id}`, DBUtils.orginizeResult(data => {
        if (data.success) resolve(data);
        else reject(data);
      }))
    })
  },
  updateArticle (article) {
    return new Promise((resolve, reject) => {
      pool2blog.query(`update article set title=${article.title},author=${article.author || ''},date=${article.date},content=${article.content} where id=${id}`, DBUtils.orginizeResult(data => {
        if (data.success) resolve(data);
        else reject(data);
      }))
    })
  },
  addArticle (article) {
    return new Promise((resolve, reject) => {
      pool2blog.query(`insert into article (title,author,date,content) values ('${article.title}','${article.author}','${article.date}','${article.content}')`, DBUtils.orginizeResult(result => {
        if (result.success) {
          resolve({
            success: true,
            data: {id: result.data.insertId}
          });
        }
        else reject(result);
      }))
    }).catch(e => console.log(e))
  }
};

module.exports = BlogDatabase;
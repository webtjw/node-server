const mysql = require('mysql');
const DBUtils  = require('./DBUtils');
const config = require('./dbConfig');

let pool2blog = mysql.createPool({
  host: 'localhost',
  user: 'tanjiawei',
  password: '123456',
  database: config.databaseName,
  connectionLimit: 10
});

let ioHandler = {
  // 查询最新的文章
  queryLatestArticle (number) {
    console.log(number)
    return new Promise((resolve, reject) => {
      pool2blog.query(`select * from article order by id desc limit ${number}`, DBUtils.orginizeResult(data => {
        if (data.success) resolve(data);
        else reject(data);
      }));
    }).catch(e => console.log(e))
  },
  // 查询某篇文章
  querySpecificArticle (id) {
    return new Promise((resolve, reject) => {
      pool2blog.query(`select * from article where id=${id}`, DBUtils.orginizeResult(data => {
        if (data.success) resolve(data);
        else reject(data);
      }))
    })
  },
  // 更新某篇文章
  updateArticle (article) {
    return new Promise((resolve, reject) => {
      pool2blog.query(`update article
        set title=${article.title},
        author=${article.author || ''},
        time=${article.date},
        codeText=${article.content}
        where id=${id}`,
      DBUtils.orginizeResult(data => {
        if (data.success) resolve(data);
        else reject(data);
      }))
    })
  },
  addArticle (article) {
    return new Promise((resolve, reject) => {
      pool2blog.query(`insert into article (title,author,date,content) values ('${article.title}','${article.author || ''}','${article.time}','${article.content}')`, DBUtils.orginizeResult(result => {
        if (result.success) {
          resolve({
            success: true,
            data: {id: result.data.insertId}
          });
        }
        else reject(result);
      }))
    }).catch(e => console.log(e))
  },
  queryToken (token) {
    return new Promise((resolve, reject) => {
      pool2blog.query(`select * from developer where token='${token}'`, DBUtils.orginizeResult(data => {
        if (data.success) resolve(data)
        else reject(data)
      }))
    })
  }
};

module.exports = ioHandler;
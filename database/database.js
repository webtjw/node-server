const mysql = require('mysql');
const DBUtils  = require('./DBUtils');
const config = require('./dbConfig');

let pool2blog = mysql.createPool({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.databaseName,
  connectionLimit: config.connectionLimit
});

let database = {
  async query (sql) {
    return new Promise((resolve, reject) => {
      pool2blog.query(sql, (mysqlError, result, fields) => {
        if (mysqlError) resolve({
          success: false,
          data: null,
          message: mysqlError.sqlMessage || '数据库查询操作失败'
        });
        else resolve({
          success: true,
          data: result,
          message: ''
        });
      })
    });
  },
  // 查询最新的文章
  queryLatestArticle (number) {
    return new Promise((resolve, reject) => {
      database.query(`select * from article order by id desc limit ${number}`, result => {
        if (result.success) resolve(result);
        else reject(result);
      })
    })
  },
  // 查询某篇文章
  queryArticle (id) {
    let result = database.query(`select * from article where id=${id}`);
    return result;
  },
  /**
   * 更新文章
   * @param article: Object
   * @param article.id: required Number
   * @param article.title: required String
   * @param article.author: String 
   * @param article.category: required String
   * @param article.tags: required Array
   * @param article.codeText: required String
   */
  async updateArticle (article) {
    let tags = article.tags.toString();

    let queryResult = await database.queryArticle(article.id);

    let updateResult = await database.query(`update article set title='${article.title}',author='${article.author || ''}',category='${article.category}',tags='${tags}',time='${article.time}',codeText='${article.codeText}' where id=${article.id}`);
    
    if (queryResult.success && queryResult.data) updateResult.origin = queryResult.data;

    return updateResult;
  },
  /**
   * 新增文章
   * @param article: Object
   * @param article.title: required String
   * @param article.author: String 
   * @param article.category: required String
   * @param article.tags: required Array
   * @param article.codeText: required String
   */
  async addArticle (article) {
    let result = await database.query(`insert into article (title,category,tags,time,codeText) values ('${article.title}','${article.category}','${article.tags}','${article.time}','${article.codeText}')`);
    return result;
  },
  // 查询 token
  queryToken (token) {
    return new Promise((resolve, reject) => {
      database.query(`select * from developer where token='${token}'`, result => {
        if (result.success) resolve(result)
        else reject(result)
      })
    })
  },
  /**
   * 更新 category
   * @param category: Object
   */
  async updateCategory (category) {
    for (let key of Object.keys(category)) {
      let queryResult = await database.query(`select * from category where name="${key}"`);

      if (queryResult.success) {
        if (queryResult.data && Array.isArray(queryResult.data) && queryResult.data.length) database.query(`update category set number=${queryResult.data[0].number + category[key]} where name='${key}'`);
        else database.query(`insert into category (name, number) values ('${key}', 1)`);
      }
    }
  },
  async updateTags (tags) {
    for (let key of Object.keys(tags)) {
      let queryResult = await database.query(`select * from tags where name='${key}'`);

      if (queryResult.success) {
        if (queryResult.data && queryResult.data.length && Array.isArray(queryResult.data)) database.query(`update tags set number=${queryResult.data[0].number + tags[key]}`);
        else database.query(`insert into tags (name, number) values ('${key}', 1)`);
      }
    }
  },
  async queryCategories () {
    let result = await database.query(`select id,name from category order by number desc`);
    return result;
  },
  async queryTags () {
    let result = await database.query(`select id,name from tags`);
    return result;
  },
  async queryIndex () {

  },
  async queryArticleByCate (name) {
    let result = await database.query(`select * from article where category='${name}' order by time desc`);

    return result;
  }
};

module.exports = database;
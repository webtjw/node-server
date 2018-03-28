const database = require('../../database/database');

const spots = {
  /* tags */
  async getAllTags () {
    return await database.query(`select * from tags`);
  },
  /* article */
  async getArticleById (id) {
    return await database.query(`select * from article where id=${id}`);
  },
  async saveArticle (article) {
    const {id, title, tags, time, description, codeText} = article;
    // 'id' indicates that this article has existed in the db
    if (id) return await database.query(`update article set title='${title}',tags='${tags.toString()}',time='${time}',codeText='${codeText}',description='${description}' where id=${id}`);
    else return await  database.query(`insert into article (title,tags,time,description,codeText) values ('${title}','${tags.toString()}','${time}','${description}','${codeText}')`);
  },
  async getIndexArticle (size) {
    return await database.query(`select id,title,tags,time,description from article order by time desc limit ${size}`);
  }
}

module.exports = spots;

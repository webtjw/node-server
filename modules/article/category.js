const database = require('../../database/database');

let category = {};

category.json = {}; // 用于保存 id - content 对，避免重复查询 db

category.queuryById = async (id) => {
  let result = database.queryCateById(id);
  return result;
}

module.exports = category;

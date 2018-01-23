const moment = require('moment');
const database = require('../database/database');




let article = {};

const queryIndex = require('./article/queryIndex'); // 首页三个类型的文章概要集合
article.queryIndex = queryIndex;

const saveArticle = require('./article/saveArticle'); // 保存文章：新增和编辑
article.saveArticle = saveArticle;
article.queryIndex = queryIndex;

const queryAttributes = require('./article/queryAttributes'); // 保存文章：查询所有的分类和标签
article.queryAttributes = queryAttributes;

const login = require('./article/login'); // 保存文章：查询所有的分类和标签
article.login = login;

const queryCategories = require('./article/queryCategories'); // 分类首页：查询所有分类
article.queryCategories = queryCategories;

const queryAllTags = require('./article/queryAllTags'); // 标签首页：查询所有标签
article.queryAllTags = queryAllTags;

const getArticleById = require('./article/getArticleById'); // 文章详情
article.getArticleById = getArticleById;

const queryByIndex = require('./article/queryByIndex'); // 分类/标签 列表页数据接口
article.queryByIndex = queryByIndex;

const getHistory = require('./article/getHistory'); // 归档数据接口
article.getHistory = getHistory;















module.exports = article;

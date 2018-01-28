import connect from '../toolkits/connect'

// 首页获取文章，number 表示获取的最大篇数
export async function getIndexArticle (number) {
  let result = await connect({
    url: `/api/article/getIndex`,
    method: 'POST'
  })
  return result
}

// 文章编辑页的保存 function，只传 markdown 即可
export async function saveArticle (article) {
  let params = {
    url: `/api/article/save`,
    method: 'POST',
    data: article
  }
  return connect(params)
}

// 作为开发者登录
export async function login (token) {
  let params = {
    url: `/api/article/login`,
    method: 'POST',
    data: {token}
  }
  return connect(params)
}

// 获取 db 里面的文章分类和标签
export async function getRemoteTagsCate () {
  let params = {
    url: '/api/article/attributes',
    method: 'POST'
  }
  return connect(params)
}

// 获取特定 id 的文章内容
export async function getArticleById (id, useMarkdown) {
  if (id !== undefined && typeof id === 'number' && id >= 0) {
    let params = {
      url: `/api/article/detail`,
      method: 'POST',
      data: {id, useMarkdown}
    }
    return connect(params)
  } else {
    return false
  }
}

// 获取 db 里面的文章分类
export async function getRemoteCat () {
  let params = {
    url: '/api/article/categories',
    method: 'POST'
  }
  return connect(params)
}

// 获取 db 里面的文章标签
export async function getRemoteTags () {
  let params = {
    url: '/api/article/tags',
    method: 'POST'
  }
  return connect(params)
}

export async function getArticleByIndex (obj) {
  let params = {
    url: '/api/article/queryByIndex',
    method: 'POST',
    data: obj
  }
  return connect(params)
}

// 归档查询文档，也是要分页
export async function getHistoryArticle (obj) {
  let params = {
    url: '/api/article/getHistory',
    method: 'POST',
    data: obj
  }
  return connect(params)
}

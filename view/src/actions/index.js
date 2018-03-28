import connect from '../toolkits/connect'

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
export async function getArticleById (id) {
  if (id !== undefined && typeof id === 'number' && id >= 0) {
    let params = {
      url: `/article/detail`,
      method: 'POST',
      data: {id}
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

// upload single file synchronously
export async function uploadFile (file) {
  var formdata = new FormData()
  formdata.append('file', file)

  return connect({
    url: '/common/upload',
    method: 'POST',
    data: formdata,
    headers: {'Content-Type': 'multipart/form-data'}
  })
}

// get all data of edit page
export async function getEditArticleData (id) {
  // An non-undefined 'id' corresponds to an existed article
  return connect({
    url: '/article/edit',
    method: 'POST',
    data: {id}
  })
}

// get all tags data
export async function getAllTags () {
  let params = {
    url: '/article/allTags',
    method: 'GET'
  }
  return connect(params)
}

// home page's data access
export async function getIndexArticle () {
  let result = await connect({
    url: `/article/index`,
    method: 'POST'
  })
  return result
}

// article saving
export async function saveArticle (article) {
  let params = {
    url: `/article/save`,
    method: 'POST',
    data: article
  }
  return connect(params)
}

// single tag page's data
export async function getArticleByTag (tag, pageIndex = 0) {
  if (tag && typeof pageIndex === 'number' && pageIndex >= 0) {
    return connect({
      url: '/article/getArticleByTag',
      method: 'POST',
      data: {tag, pageIndex}
    })
  }
}

// archive page: get data
export async function getArchive (index, size) {
  return connect({
    url: '/article/getArchive',
    method: 'POST',
    data: {index, size}
  })
}

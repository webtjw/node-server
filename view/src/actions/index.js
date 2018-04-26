import connect from '../toolkits/connect'

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

// login page
export async function login (token) {
  return connect({
    url: `/article/login`,
    method: 'POST',
    data: {token}
  })
}

// check login status
export async function checkLogin (name) {
  return connect({
    url: `/article/checkLogin`,
    method: 'POST',
    data: {name}
  })
}

// article detail
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

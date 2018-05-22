import axiosRequest from './axios';

export async function getHomeArticle () {
  const result = await axiosRequest.get('/article/index');
  return result;
}

export async function getArticleDetail (id) {
  return /^[0-9]+$/.test(id) ? axiosRequest({
    url: `/article/data`,
    method: 'POST',
    data: {id}
  }) : null;
}

export async function getAllTags () {
  return axiosRequest.get('/article/allTags')
}

export async function getArticleByTag (tag, pageIndex = 0) {
  if (tag && typeof pageIndex === 'number' && pageIndex >= 0) {
    return axiosRequest({
      url: '/article/getArticleByTag',
      method: 'POST',
      data: {tag, pageIndex}
    })
  }
}

export async function getArchive (index = 0, size = 20) {
  return axiosRequest({
    url: '/article/getArchive',
    method: 'POST',
    data: {index, size}
  })
}

export async function login (token) {
  return axiosRequest({
    url: `/article/login`,
    method: 'POST',
    data: {token}
  })
}

export async function uploadFile (file) {
  const formdata = new FormData()
  formdata.append('file', file)

  return axiosRequest({
    url: '/common/upload',
    method: 'POST',
    data: formdata,
    headers: {'Content-Type': 'multipart/form-data'}
  })
}
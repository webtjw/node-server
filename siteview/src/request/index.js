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
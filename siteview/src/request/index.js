import axiosRequest from './axios';

export async function getHomeArticle () {
  const result = await axiosRequest.get('/article/index');
  return result;
}
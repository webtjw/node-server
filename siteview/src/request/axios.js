import axios from 'axios';

const axiosRequest = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:3001' : ''
});

axiosRequest.interceptors.response.use(response => {
  return response;
}, error => {
  return Promise.resolve(error); // component AsyncTips has to receive result even if the request fails.
});

export default axiosRequest;
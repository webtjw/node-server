import axios from 'axios'
import config from './config'

const apiPrefix = config.api.prefix

export function getLatestArticleList (number) {
  return axios.get(`${apiPrefix}/article/latest/${number}`)
}

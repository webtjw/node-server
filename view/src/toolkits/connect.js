import axios from 'axios'
import Toast from '@/toolkits/Toast'

let envConfig = {
  baseUrl: 'http://127.0.0.1:3000'
}

// 创建 json 实例
let axiosJSON = axios.create({
  responseType: 'json',
  timeout: 60000, // 60s 超时
  baseURL: envConfig.baseUrl,
  withCredentials: process.env.NODE_ENV !== 'production'
})

// 处理返回错误
axiosJSON.interceptors.response.use(response => {
  if (response && response.data && response.data.success) return response.data.data || response.data.success
  else {
    Toast.show('请求失败' + (response.data.message ? `，原因：${response.data.message}` : ''))
    return false
  }
})

let connect = async function (params) {
  let result = await axiosJSON(params).catch(() => false)
  // if (!result) Toast.show('请求失败')
  return result
}

export default connect

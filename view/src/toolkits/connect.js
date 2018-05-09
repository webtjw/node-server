import axios from 'axios'
import Toast from '@/toolkits/Toast'

// 创建 json 实例
let axiosJSON = axios.create({
  responseType: 'json',
  timeout: 60000, // 60s 超时
  baseURL: process.env.NODE_ENV !== 'production' ? 'http://127.0.0.1:3000' : '',
  withCredentials: process.env.NODE_ENV !== 'production'
})

// 在接收到响应时，对响应做预处理
axiosJSON.interceptors.response.use(response => {
  if (response && response.data && response.data.success) return response.data
  else {
    Toast.show('请求失败' + (response.data.message ? `，原因：${response.data.message}` : ''))
    return false
  }
})

let connect = async function (params) {
  let result = await axiosJSON(params).catch(() => {
    Toast.show('网络异常，请检查后重试')
    return {
      success: false,
      errorType: 'net',
      message: '请求发出失败，请重试'
    }
  })
  return result
}

export default connect

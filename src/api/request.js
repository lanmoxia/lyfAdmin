import axios from 'axios'
import {AXIOS_TIMEOUT,ACCESS_TOKEN,AUTH} from '@/constant'
import {
  handleAuthError,
  handleGeneralError,
  handleNetworkError,
} from "./tools"
import { addRequest } from "@/utils/refresh"
import {getItem} from '@/utils/storage'

// 初始化
const server = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: AXIOS_TIMEOUT
})


// 请求拦截器
server.interceptors.request.use(
  config => {
    config.headers = config.headers || {}
    config.headers['Content-Type'] = config.headers['Content-Type'] || 'application/json'
    const accessToken = getItem(ACCESS_TOKEN) || ""
    if (accessToken) {
      config.headers[AUTH] = `Bearer ${accessToken}`
    }
    return config
  },
  error => {
    Message.error({message: '请求超时!'})
    return Promise.resolve(error) // resolve 返回可以让进度条关闭 不用处理关闭
  }
)

// 响应拦截器
server.interceptors.response.use(
  async response => {
    let {status,data,config} = response
    if (status !== 200) return Promise.reject(data)
    if(data.errno && data.errno !== 0){
      const isAuthErrorHandled = handleAuthError(data.errno)
      if(!isAuthErrorHandled){
        return new Promise((resolve) => {
          // 添加到重试队列，等待 token 刷新
          addRequest(() => resolve(server(config)))
        })  
      }
      handleGeneralError(data.errno,data.errmsg)
      return Promise.reject(data); 
    }
    return response
  }, err => {
    console.log(err)
    handleNetworkError(err.response.status)
    return Promise.reject(err)
  }
)

export default server
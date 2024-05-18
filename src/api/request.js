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
    config.headers = config.headers || {};
    config.headers['Content-Type'] = config.headers['Content-Type'] || 'application/json';
    try {
      const accessToken = getItem(ACCESS_TOKEN) || "";
      if (accessToken) {
        config.headers[AUTH] = `Bearer ${accessToken}`;
      }
    } catch (error) {
      console.error('Error getting access token:', error);
    }
    return config
  },
  error => {
    return Promise.reject(new Error(error))
  }
)

// 响应拦截器
server.interceptors.response.use(
  response => {
    let {status,data,config} = response
    if (status !== 200) return Promise.reject(data)
    if(data.code && data.code !== 200){
      const isAuthErrorHandled = handleAuthError(data.code, config)
      if (!isAuthErrorHandled){
        return new Promise((resolve) => {
          // 添加到重试队列，等待 token 刷新
          addRequest(() => resolve(server(config)))
        })        
      }
      handleGeneralError(data.message)
    } 
    return response
  }, err => {
    handleNetworkError(err.response.status)
    return Promise.reject(err)
  }
)

export default server
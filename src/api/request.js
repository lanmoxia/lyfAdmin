import axios from 'axios'
import {USERINFO,ACCESS_TOKEN,REFRESH_TOKEN,AUTH,PASS,AXIOS_TIMEOUT} from '@/constant'
import {getItem,setItem,removeItem,removeAllItem} from '@/utils/storage'
import router from '@/router'
import { addRequest, refreshToken } from "@/utils/refresh"
// 初始化
const requests = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // http 开头的就不用用这个url
  timeout: AXIOS_TIMEOUT,
  headers: {
    "Content-type": "application/json"
  }
})


// 请求拦截器
requests.interceptors.request.use(
  config => {
    // token 最好在 storage中获取 , pinia 可能还未初始化
    const token = getItem(ACCESS_TOKEN) || "" 
    if(token){
      // config.headers[AUTH] = `Bearer + ${user.token}`
      config.headers[AUTH] = token
    }
    return config
  },
  error => {
    console.log('请求拦截器错误',error)
    return Promise.reject(error)
  }
)

// 响应拦截器
requests.interceptors.response.use( 
  async response => {
    let {config, data} = response
    return new Promise((resolve,reject)=>{  
      if(data.code === 4003){
        removeItem(ACCESS_TOKEN)
        addRequest(() => resolve(requests(config)))
        refreshToken()
      }else {
        resolve(data)
      }
    })
    
   
  

  // 检查 HTTP 状态码
  if (response.status === 200 || response.status === 403) {
    if(response.data.code === 4003){
      removeItem(ACCESS_TOKEN)
      addRequest(() => resolve(requests(response.data)))
      refreshToken()
    }
    // 检查自定义code
    if (response.data.code === 200) {
      return response.data
    }else{
      // 如果code不为200，根据后端约定的错误码处理错误
      const errorMessage = response.data.msg || '未知错误'
      // 可以在这里添加错误提示，例如使用ElementUI的Message组件
      // ElMessage.error(errorMessage);
      return Promise.reject(new Error(errorMessage))
    }
  } else {
    console.log('status 非200',response.status)
    // 如果HTTP状态码不是200，处理HTTP错误
    const httpErrorMessage = 'HTTP状态错误: ' + response.status
    // ElMessage.error(httpErrorMessage);
    return Promise.reject(new Error(httpErrorMessage))
  }
},error => {
  // 处理响应错误
  let errorMessage = '请求失败'
  if (error.response) {
    // 服务器返回了响应
    errorMessage += `: ${error.response.status} ${error.response.statusText} + 'xxx'`
  } else if (error.request) {
    // 请求已发出，但没有收到响应
    errorMessage += ': 服务器没有响应a'
  } else {
    // 发生了其他错误
    errorMessage += `: ${error.message} + 'yyy'`
  }
  // 可以在这里添加错误提示，例如使用ElementUI的Message组件
  // ElMessage.error(errorMessage);
  return Promise.reject(new Error(errorMessage))
})

export default requests
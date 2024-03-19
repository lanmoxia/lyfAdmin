import axios from 'axios'
import store from '@/store'
import { ElMessage } from 'element-plus'
import {ACCESS_TOKEN,AUTH,AXIOS_TIMEOUT} from '@/constant'
import { switchServerUrl } from "@/utils/index";
import {getItem,removeItem} from '@/utils/storage'
import { addRequest, sendRefreshToken } from '@/utils/refresh'


/**
 * axios请求拦截器
 * @param {object} config axios请求配置对象
 * @return {object} 请求成功或失败时返回的配置对象或者promise error对象
 **/
axios.interceptors.request.use(config => {
  let accessToken =  getItem(ACCESS_TOKEN)
  if(accessToken){
    config.headers[AUTH] = accessToken
  }
  return config
}, error => {
  return Promise.reject(error)
})

/**
 * axios 响应拦截器
 * @param {object} response 从服务端响应的数据对象或者error对象
 * @return {object} 响应成功或失败时返回的响应对象或者promise error对象
 **/
axios.interceptors.response.use( 
  response => {
    return response
  },
  error => {
    if(error.response){
      if (error.response.data.code === 4003) {
        // 如果token无效或过期，则执行退出登录操作
        removeItem(ACCESS_TOKEN)
        // 把请求数据的 配置存储起来，用于请求到新的短token，再次请求数据，打到无感刷新token
           // TODO: 报错看下 因为他的项目是直接调用本项目中的封装的 axios 的 serve
        addRequest(() => resolve(serve(config)))
        // 携带长token去请求新的token
        console.log('刷新前')
        sendRefreshToken()
        console.log('刷新后')
      }
    }
    return Promise.reject(error)
  }
)
export default function http(options) {

  //获取不同环境的请求域名
  let server_url = switchServerUrl()

  let opt = {},
    method = options.method || "post",
    url = options.url,
    data = options.data || {};
  if (!options.url) {
    console.error("url参数缺失")
    return;
  }

  if (method == "get") {
    opt = {
      method: method,
      baseURL: "",
      url: url.indexOf('//') > -1 ? url : (server_url + url),
      params: data,
      timeout: AXIOS_TIMEOUT,
     
    }
  } else if (method == "post") {
    opt = {
      method: method,
      baseURL: "",
      url: url.indexOf('//') > -1 ? url : (server_url + url),
      data: data, //qs.stringify(data)
      timeout: AXIOS_TIMEOUT,
    }
  }
  // 如果提供了headers，则合并到请求配置中
  if (options.headers) {
    opt.headers = {
      ...opt.headers,
      ...options.headers
    }
  }
  return new Promise((resolve, reject) => {
    axios(opt).then(res => {
      if (res && (res.status === 200 || res.status === 304 || res.status === 400)) {
        var data = res.data;
        if (data.status && data.status.error_code == 0 ||  data.status.error_code == 2002) {
          resolve(data)
        } else if (data.status && (data.status.error_code == 101 || data.status.error_code == 102 || data.status.error_msg == '您还没有登录')) { //101请获取权限 102登录失效

          ElMessage.error(data.status.error_msg) // 提示错误信息
          // 登出操作
          store.dispatch('user/logout')
        } else {
          ElMessage.error(data.status.error_msg || "网络异常，请稍后重试！") // 提示错误信息
          reject(data);
        }
      } else {
        ElMessage.error(res || "网络异常，请稍后重试！") // 提示错误信息
        reject("网络异常，请稍后重试")
      }
    }, err => {
      ElMessage.error(err) // 提示错误信息
      reject(err)
    })
  })

}

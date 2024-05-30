import store from '@/store'
import { ElMessage } from 'element-plus'
import { refreshToken } from "@/utils/refresh"
import {getItem, removeItem} from '@/utils/storage'
import {AXIOS_TIMEOUT,ACCESS_TOKEN,AUTH} from '@/constant'

// 关于校验统一错误处理函数
export const handleAuthError = (errno) => {
  const authErrMap = {
    "108404": "账户异常，请重新登录",
    "100404": "登录失败，请联系管理员",
    "106401": "此账号已冻结",
    "108401": "您太久没登录，请重新登录"
  }

  if (authErrMap.hasOwnProperty(errno)) {
    ElMessage.error(authErrMap[errno])
    store.dispatch('user/logout')
    store.commit('user/setLoadingState', false)
    return false
  }else if(errno === "100401"){
    removeItem(ACCESS_TOKEN)
    refreshToken()  
    return false
  }
  return true
}

// 关于一般错误处理函数
export const handleGeneralError = (errno,errmsg) => {
  if(errno !== 0){
    ElMessage.error(errmsg)
    store.commit('user/setLoadingState', false)
  }
}


// 关于网络统一错误处理函数
export const handleNetworkError = (errStatus) => {
  const networkErrMap = {
    "400": "服务器错误,请联系管理员", 
    "401": "未授权，请重新登录",
    "403": "拒绝访问",
    "404": "请求错误，未找到该资源",
    "405": "请求方法未允许",
    "408": "请求超时",
    "500": "服务器端出错,请稍后刷新页面",
    "501": "网络未实现",
    "502": "网络错误",
    "503": "服务不可用",
    "504": "网络超时",
    "505": "http版本不支持该请求",
  }
  if (errStatus) {
    ElMessage.error(networkErrMap[errStatus] ?? `其他连接错误 --${errStatus}`);
    return store.dispatch('user/logout')
  }
  ElMessage.error("无法连接到服务器！")
  store.dispatch('user/logout')
}
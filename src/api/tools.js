import store from '@/store';
import { ElMessage } from 'element-plus'
import {ACCESS_TOKEN} from '@/constant'
import {refreshToken } from "@/utils/refresh"
import {removeItem } from '@/utils/storage'

export const handleNetworkError = (errStatus) => {
  const networkErrMap = {
    "400": "服务器错误,请联系管理员", // 长短 token 不存在
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
    return
  }
  ElMessage.error("无法连接到服务器！");
  // TODO 解决 登录注册等 500错误的 Loading问题
}

export const handleAuthError = (errno,config) => {
//console.log('校验错误处理执行了')
  const authErrMap = {
    "10032": "您太久没登录，请重新登录~", // 长 token 过期或错误
    "10033": "账户未绑定角色，请联系管理员绑定角色",
    "10034": "该用户未注册，请联系管理员注册用户",
    "10035": "code 无法获取对应第三方平台用户",
    "10036": "该账户未关联员工，请联系管理员做关联",
    "10037": "账号已无效",
    "10038": "账号未找到",
    '10039': '请提供验证码',
    '10040': '验证码错误'
  }

  if (authErrMap.hasOwnProperty(errno)) {
    ElMessage.error(authErrMap[errno])
    // 授权错误，登出账户
    store.dispatch('user/logout')
    return false
  }

  if (errno === 10041) {
    console.log('响应拦截器非error中获取的code码',errno)
    // 执行刷新 token
    removeItem(ACCESS_TOKEN);
    refreshToken()
    return false 
  }
  return true
}
export const handleGeneralError = (errno,errmsg) => {
  console.log('一般错误处理执行了')
  console.log(errno,errmsg)
  if(errno !== 200){
    console.log(errno,errmsg)
    ElMessage.error(errmsg)
		return false
  }
  return true
}

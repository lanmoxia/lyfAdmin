import {Get, Post} from '../xxx'

// 获取验证码
export function getCode(){
  return Get('/captcha')
}

// 创建用户
export function userRegister(data){
  return Post('/users', data)
}

// 用户登录
export function userLogin(data){
  return Post('/login', data)
}

// 获取手机验证码
export function getSmsCode(data){
  return Post('/mobile_code', data)
}

// 手机用户登录
export function mobileLogin(data){
  return Post('/mobile_login', data)
}

// 用户权限获取
export function permissionList(){
  return Get('/permissions')
}

// 刷新 Token
export function refreshToken(config = {}){
  return Post('/refresh', {},{},config)
}

// 文件上传
export function uploadFile(data){
  return Post('/users/upload',data)
}

// 用户模板下载
export function userTemplate(){
  return Get('/down/user_template', {},{ responseType: 'blob' })
}

export const commonApi = {
  getCode,
  userRegister,
  userLogin,
  getSmsCode,
  mobileLogin,
  permissionList,
  refreshToken,
  uploadFile,
  userTemplate
}


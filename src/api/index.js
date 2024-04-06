import useHttp from '@/api/useHttp'

/**
 * 注册
 */
export const userRegister = (params) => {
  return useHttp({
    url: '/user/register',
    method: 'post',
    data: {...params}
  })
}

/**
 * 登录
 */
export const userLogin = (params) => {
  return useHttp({
    url: '/user/login',
    method: 'post',
    data: {...params}
  })
}

/**
 * 手机登录
 */
export const mobileLogin = (params) => {
  return useHttp({
    url: '/user/mobile_login',
    method: 'post',
    data: {...params}
  })
}

/**
 * 用户更新
 */
export const userAvatarUpdate = (formData) => {
 return useHttp({
  url: "/user/updateAvatar",
  method: 'POST',
  data: formData
 })
}


/**
 * 获取验证码
 */
export const getCode = () => {
  return useHttp({
    url: '/captcha',
    method: 'get'
  })
}

/**
 * 获取短信验证码
 */
export const getSmsCode = (params) => {
  return useHttp({
    url: '/verify_code',
    method: 'post',
    data: {...params}
  })
}

/**
 * 获取公钥
 */
export const getKey = () => {
  return useHttp({
    url: '/publickey',
    method: 'get'
  })
}

/**
 * 刷新 token
 */
// export const requestRefreshToken = (refreshToken) => {
//   return useHttp({
//     url: '/refresh',
//     method: 'get',
//     headers: { 'pass': refreshToken }
//   })
// }

/**
 * 获取权限列表
 */
export const getPermission = () => {
  return useHttp({
    url: '/permission/list',
    method: 'get'
  })
}

/**
 * 获取用户列表
 */
export const getAdmintorList = (params) =>{
  return useHttp({
    url: '/user/getList',
    method: 'get',
    data: {...params}
  })
}

/**
 * 获取角色
 */
export const getRoleList = () => {
  return useHttp({
    url: '/role/list',
    method: 'get'
  })
}

/**
 * 上传图片
 */
export const publicUploadFile = (params) => {
  return useHttp({
    url: '/public/uploadFile',
    method: 'post',
    data: {...params}
  })
}
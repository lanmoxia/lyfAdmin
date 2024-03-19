import axios from '@/utils/axios'

/**
 * 登录
 */
export function login(params) {
  return axios({
    url: '/user/login',
    method: 'post',
    data: params
  })
}

/**
 * 获取图形验证码
 */
export function getCode() {
  return axios({
    url: '/captcha',
    method: 'get'
  })
}

/**
 * 刷新 token
 */
export function requestRefreshToken(refreshToken){
  return axios({
    url: '/refresh',
    method: 'get',
    headers: { 'pass': refreshToken }
  })
}


/**
 * 权限列表（侧边栏权限和按钮权限）
 * @param params
 */
export function getPermission() {
  return axios({
    url: '/permission/list',
    method: 'get'
  })
}

/**
 * 账号列表
 * @param params
 */
export function getAdmintorList() {
  return axios({
    url: '/user/getList',
    method: 'get'
  })
}

/**
 * 角色列表
 * @param params
 */
export function getRoleList() {
  return axios({
    url: '/role/list',
    method: 'get'
  })
}



//上传图片
export function publicUploadFile(params) {
  return axios({
    url: '/public/uploadFile',
    method: 'post',
    data: params
  })
}





import {Get, Post, Put, Delete, Patch} from '../xxx'

// 用户权限获取
export function userPermissions(){
  return Get('/users/permission')
}

// 创建用户
export function userCreate(data){
  return Post('users',data)
}

// 批量创建用户
export function batchCreateUser(data){
  return Post('users_create',data)
}

// 创建手机用户
export function mobileUserCreate(data){
  return Post('mobile_users',data)
}

// 用户列表
export function userList(page=1, limit=10){
  return Get('users', {page,limit})
}

// 手机用户列表
export function mobileUserList(page=1, limit=10){
  return Get('/mobile_users', {page,limit})
}

// 用户更新
export function userUpdate(id,data){
  return Put(`/users/${id}`,data)
}

// 手机用户更新
export function mobileUpdate(id,data){
  return Put(`/mobile_users/${id}`,data)
}

// 删除用户
export function userDelete(id){
  return Delete(`/users/${id}`)
}

// 删除手机用户
export function mobileDelete(id){
  return Delete(`/mobile_users/${id}`)
}

// 获取用户
export function userOne(id){
  return Get(`/users/${id}`)
}

// 获取手机用户
export function mobileOne(id){
  return Get(`/mobile_users/${id}`)
}

// 用户分配角色
export function userPatch(id,data){
  return Patch(`/users/${id}/roles`,data)
}

// 手机用户分配角色
export function mobilePatch(id,data){
  return Patch(`/mobile_users/${id}/roles`,data)
}

export const userApi = {
  userPermissions,
  userCreate,
  mobileUserCreate,
  userList,
  mobileUserList,
  userUpdate,
  mobileUpdate,
  userDelete,
  mobileDelete,
  userOne,
  mobileOne,
  userPatch,
  mobilePatch,
  batchCreateUser
}

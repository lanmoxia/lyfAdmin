import {Get, Post, Put, Delete, Patch} from '../xxx'

// 角色创建
export function roleCreate(data){
  return Post(`/roles`,data)
}

// 菜单创建
export function menuCreate(data){
  return Post(`/menus`,data)
}

// 按钮创建
export function btnCreate(data){
  return Post(`/resources`,data)
}

// 角色列表
export function roleList(page=1, limit=10){
  return Get(`/roles`, {page,limit})
}

// 菜单列表
export function menuList(page=1, limit=10){
  return Get(`/menus`, {page,limit})
}

// 按钮列表
export function btnList(page=1, limit=10){
  return Get(`/resources`, {page,limit})
}

// 更新角色
export function roleUpdate(id,data){
  return Put(`/roles/${id}`,data)
}
// 更新菜单
export function menuUpdate(id,data){
  return Put(`/menus/${id}`,data)
}
// 更新按钮
export function btnUpdate(id,data){
  return Put(`/resources/${id}`,data)
}
// 删除角色
export function roleDelete(id){
  return Delete(`/roles/${id}`)
}
// 删除菜单
export function menuDelete(id){
  return Delete(`/menus/${id}`)
}
// 删除按钮
export function btnDelete(id){
  return Delete(`/resources/${id}`)
}
// 获取角色
export function roleOne(id){
  return Get(`/roles/${id}`)
}
// 获取菜单
export function menuOne(id){
  return Get(`/menus/${id}`)
}
// 获取按钮
export function btnOne(id){
  return Get(`/resources/${id}`)
}

// 角色分配权限
export function rolePatch(id,data){
  return Patch(`/roles/${id}/permissions`,data)
}

// 用户搜索
export function usersSearch(params){
  return Get(`/users/search`, params)
}

// // 角色分配菜单
// export function menuPatch(id,data){
//   return Patch(`/roles/${id}/menus`,data)
// }

// // 角色分配按钮
// export function btnPatch(id,data){
//   return Patch(`/roles/${id}/resources`,data)
// }

export const permissionApi = {
  roleCreate,
  menuCreate,
  btnCreate,
  roleList,
  menuList,
  btnList,
  roleUpdate,
  menuUpdate,
  btnUpdate,
  roleDelete,
  menuDelete,
  btnDelete,
  roleOne,
  menuOne,
  btnOne,
  rolePatch,
  usersSearch
}

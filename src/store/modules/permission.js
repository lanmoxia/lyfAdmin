// 专门处理权限路由的模块
import { privateRoutes, publicRoutes } from '@/router'

/**
 * 检查当前的路由是否有权限
 * @param roles 接口数据
 * @param route
 * @returns {boolean}
 */
function hasPermission(roles, route) { // (菜单权限 单个私有路由)
  let hasRouter = false
  for (let i = 0; i < roles.length; i++) {
    if (roles[i].unique === route.path || '/' + roles[i].unique === route.path) {
      hasRouter = true
      break
    }
  }
  return hasRouter
}


/**
 * 根据服务端返回的路由数据，筛选过滤本地的路由数据
 * @param routes 本地的路由数据
 * @param roles 接口获取的路由数据
 */
export function filterPrivateRoutes(routes, roles) { // (私有路由 菜单权限)
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) { // (菜单权限 单个私有路由)
      if (tmp.children) {
        tmp.children = filterPrivateRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

export default {
  namespaced: true,
  state: {
    // 路由表：初始拥有静态路由权限
    routes: publicRoutes
  },
  mutations: {
    /**
     * 增加路由
     */
    setRoutes(state, newRoutes) {
      // 永远在静态路由的基础上增加新路由
      state.routes = [...publicRoutes, ...newRoutes]
    }
  },
  actions: {
    /**
     * 根据权限筛选路由
     */
    generateRoutes({ commit }, roles) {  // 为什么使用promise 呢？
      return new Promise(resolve => {
        let accessedRoutes = filterPrivateRoutes(privateRoutes, roles) // (私有路由 菜单权限)
        accessedRoutes.push({
          path: '/:catchAll(.*)',
          redirect: '/404'
        })
        commit('setRoutes', accessedRoutes)
        resolve(accessedRoutes)
      })
    }
  }
}

import router from './router'
import store from './store'

// 白名单
const whiteList = ['/login']

//递归，将icon替换成服务端的数据
function filterRoutesIcon(list1, list2) {
  list1.forEach(item1 => {
    list2.forEach(item2 => {
      if (item1.path == item2.url) {
        item1.meta.icon = item2.icon
      }
    })
    if (item1.children) {
      filterRoutesIcon(item1.children, list2)
    }
  })

}
/**
 * 路由前置守卫
 */
router.beforeEach(async (to, from, next) => {
  if (store.getters.token) {
    if (to.path === '/login') {
      return next('/')
    } else {
      if (!store.getters.hasRoles) {
        const { roles } = await store.dispatch('user/getPermissionData')
        const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
        filterRoutesIcon(accessRoutes, roles)


        accessRoutes.forEach(item => {
          router.addRoute(item)
        })

        return next({ ...to, replace: true })
      }
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
})


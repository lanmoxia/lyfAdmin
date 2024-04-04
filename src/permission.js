import router from './router'
import store from './store'
import {ACCESS_TOKEN} from '@/constant'
import {getItem} from '@/utils/storage'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
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
  if (getItem(ACCESS_TOKEN)) { // 这里不能在 store中取 还不存在
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
      nprogress.start()
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

/**
 * 后置守卫
 */

router.afterEach((to,from) => {
  nprogress.done()
})
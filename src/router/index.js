import {
    createRouter,
    createWebHashHistory
} from 'vue-router'
import store from '@/store'


import layout from '@/layout'
import permissions from './modules/permissions'
import third from './modules/third'
// import audio from './modules/audio'
import cssAnimation from './modules/cssAnimation'
import vueUse from './modules/vueUse'


/**
 * 私有路由表
 */
export var privateRoutes = [
    permissions,
    third,
    // audio,
    cssAnimation,
    vueUse
]
/**
 * 公开路由表
 */
export var publicRoutes = [
    {
        path: '/login',
        component: () => import('@/views/login/index')
    },
    {
        path: '/',
        // 注意：带有路径“/”的记录中的组件“默认”是一个不返回 Promise 的函数
        component: layout,
        redirect: '/home',
        children: [
            {
                path: '/home',
                name: 'home',
                component: () => import('@/views/home/index'),
                meta: { title: '首页', icon: 'home', affix: true },//affix=true,tagViews右侧没有关闭按钮
                hidden: true,//true不显示在侧边栏
            }
        ]
    },
    {
        path: '/404',
        name: '404',
        component: () => import('@/views/error-page/404')
    },
    {
        path: '/403',
        name: '403',
        component: () => import('@/views/error-page/403')
    }
]


/**
 * 初始化路由表
 */
export function resetRouter() {
  if (store.getters.hasRoles) {
    const menus = store.getters.roles
    menus.forEach(menu => {
      if (router.hasRoute(menu.name)) {
        router.removeRoute(menu.name)
      } 
    })
  }
}

const router = createRouter({
    history: createWebHashHistory(),
    routes: publicRoutes
})

export default router



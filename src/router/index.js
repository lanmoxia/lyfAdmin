import { createRouter, createWebHashHistory } from 'vue-router'

import layout from '@/layout'

/**
 * 私有路由表
 */
export var privateRoutes = []

/**
 * 公共路由
 */

export var publicRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index')
  },
  {
    path: '/',
    component: layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/index'),
        meta: { title: '首页', icon: 'home', affix: true }, // affix 标签无关闭按钮
        hidden: true, // true 不显示在侧边栏
      },
      {
        path: '/404',
        name: '404',
        component: () => import('@/views/error-page/404')
      },
      {
        path: '/401',
        name: '401',
        component: () => import('@/views/error-page/401')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: publicRoutes
})

export default router
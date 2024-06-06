/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

export default{
  path: '/adminAuth',
  component: Layout,
  redirect: '/adminAuth/roleList',
  alwaysShow: true, // will always show the root menu
  name: 'adminAuth',
  meta: {
    title: '权限管理',
    icon: 'permission'
  },
  children: [
    {
      path: '/adminAuth/roleList',
      component: () => import('@/views/permissions-page/roleList.vue'),
      name: 'getRoleList',
      meta: { title: '角色列表'}
    },
    {
      path: '/adminAuth/adminList',
      component: () => import('@/views/permissions-page/accountList.vue'),
      name: 'adminList',
      meta: { title: '账号列表'}
    },
    {
      path: '/adminAuth/permissionList',
      component: () => import('@/views/permissions-page/permissionList.vue'),
      name: 'permissionList',
      meta: { title: '权限列表'}
    },
    {
      path: '/account/detail',
      name: 'accountDetail',
      component: () => import('@/views/permissions-page/accountDetail.vue'),
      meta: { title: '账号详情'}
    }

  ]
}


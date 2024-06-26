/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

export default {
  path: '/vueUse',
  component: Layout,
  redirect: '/vueUse/elements',
  alwaysShow: true, // will always show the root menu
  name: 'vueUse',
  meta: {
    title: 'vueUse学习',
    icon: 'personnel'
  },
  children: [
    {
      path: '/vueUse/elements',
      redirect: '/elements/useDraggable',
      name: 'elements',
      meta: {title: 'elements'},
      children: [
        {
          path: '/elements/useDraggable',
          component: () => import('@/views/vue-use/elements/useDraggable.vue'),
          name: 'useDraggable',
          meta: {title: 'useDraggable'}
        },
        {
          path: '/elements/useDropZone',
          component: () => import('@/views/vue-use/elements/useDropZone.vue'),
          name: 'useDropZone',
          meta: {title: 'useDropZone'}
        },
        {
          path: '/elements/useIntersectionObserver',
          component: () => import('@/views/vue-use/elements/useIntersectionObserver.vue'),
          name: 'useIntersectionObserver',
          meta: {title: 'useIntersectionO'}
        },
      ]
    },
    {
      path: '/vueUse/component',
      redirect: '/component/createReusableTemplate',
      name: 'component',
      meta: {title: 'component'},
      children: [
        {
          path: '/component/createReusableTemplate',
          component: () => import('@/views/vue-use/component/createReusableTemplate.vue'),
          name: 'createReusableTemplate',
          meta: {title: 'createReusableT'}
        },


      ]
    },
  ]
}


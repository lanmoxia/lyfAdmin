<template>
  <div class="app-main">
    <router-view v-slot="{ Component, route }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive :include="cachedViews">
          <div v-if="Component">
            <component :is="Component" :key="route.name" />
          </div>
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>


<script setup>

import { watch, computed, ref } from 'vue'
import { isTags } from '@/utils/tags'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()
const route = useRoute()

const cachedViews = computed(() => {
  return store.getters.tagsViewList.map((x) => x.name)
})

/**
 * 生成 title
 */
const getTitle = route => {
  let title = ''
  if (!route.meta) {
    // 处理无 meta 的路由
    const pathArr = route.path.split('/')
    title = pathArr[pathArr.length - 1]
  } else {
    title = route.meta.title
  }
  return title
}

/**
 * 监听路由变化
 */
watch(
  route,
  (to, from) => {
    if (!isTags(to.path)) return 
    const { fullPath, meta, name, params, path, query } = to
    store.commit('app/addTagsViewList', {
      fullPath,
      meta,
      name,
      params,
      path,
      query,
      title: getTitle(to)
    })
  },
  {
    immediate: true
  }
)
</script>

<style lang="scss" scoped>
.app-main {
  padding: 16px;
  background-color: white;
}
</style>



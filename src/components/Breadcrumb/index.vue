<template>
  <!-- 面包屑 -->
  <el-breadcrumb class="breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in titleList" :key="item.path">
        <!-- 如果当前的 index 是最后一个路由就渲染 span -->
        <span v-if="index === titleList.length - 1" class="no-redirect">
        {{item.meta.title}}
        </span>
        <!-- 如果当前的 index 不是最后一个路由就渲染 a 标签 -->
        <a v-else class="redirect" @click.prevent="onLinkClick(item)">
          {{item.meta.title}}
        </a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'

const route = useRoute()

const titleList = ref([])
const getBreadcrumbData = () => {
  titleList.value = route.matched.filter( 
    item => item.meta && item.meta.title
  )
}

watch(
  route,
  () => {
    getBreadcrumbData()
  },
  {
    immediate: true
  }
)

// 处理点击事件
const router = useRouter()
const onLinkClick = item => {
  router.push(item.path)
}
// 如果将来需要进行主题替换，所以这里获取下动态样式
const store = useStore()
const linkHoverColor = ref(store.getters.cssVar.menuBg)
</script>

<style lang="scss" scoped>
.breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }

  .redirect {
    color: #666;
    font-weight: 600;
  }

  .redirect:hover {
    // 如果将来需要进行主题替换，所以这里不去写死样式
    color: v-bind(linkHoverColor);
    font-weight: 900;
    text-decoration: underline
  }
}
</style>


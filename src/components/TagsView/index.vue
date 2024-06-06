<template>
  <!-- 标签页组件 -->
  <div class="tags-view-container">
    <el-scrollbar class="tags-view-wrapper">

      <router-link class="tags-view-item" 
        :class="isActive(tag) ? 'active' : ''" 
        :style="{ backgroundColor: isActive(tag) ? '#ffffff' : '', borderColor: isActive(tag) ? '#f7f7f7' : ''}" 
        v-for="(tag, index) in $store.getters.tagsViewList" :key="tag.fullPath" :to="{ path: tag.fullPath }"
        @contextmenu.prevent="openMenu($event, index)">

        {{ tag.title }}

        <template v-if="!isAffiix(tag)">
          <Close @click.prevent.stop="onCloseClick(index, tag)" class="el-icon-close" />
        </template>
        
      </router-link>

    </el-scrollbar>

    <context-menu v-show="visible" :style="menuStyle" :index="selectIndex"></context-menu>

  </div>
</template>

<script setup>
import { Close } from '@element-plus/icons'
import ContextMenu from './ContextMenu.vue'
import { ref, reactive, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'

const route = useRoute()

onMounted(() => {
  // console.log(store.getters.cssVar)
})

/**
 * 是否被选中
 */
const isActive = tag => { // 是否当前激活页
  return tag.path === route.path
}
const isAffiix = tag => { // 是否固定页
  return tag.meta && tag.meta.affix
}
// contextMenu 相关
const selectIndex = ref(0)
const visible = ref(false)
const menuStyle = reactive({
  left: 0,
  top: 0
})
/**
 * 展示 menu
 */
const openMenu = (e, index) => {
  const { x, y } = e
  menuStyle.left = x + 'px'
  menuStyle.top = y + 'px'
  selectIndex.value = index
  visible.value = true
}

/**
 * 关闭 tag 的点击事件
 */
const store = useStore()
const router = useRouter()

const onCloseClick = (index, tag) => {
  store.commit('app/removeTagsView', {
    type: 'index',
    index: index
  })

  //如果删除的是当前页面，自动定位到上一个页面
  if (isActive(tag)) {
    let tagsViewList = store.getters.tagsViewList
    if (index == 0 && tagsViewList.length >= 1) {
      let pre_index = 0
      let pre_page = tagsViewList[pre_index]
      router.push(pre_page.fullPath)
    } else if (tagsViewList.length == 0) {//如果是最后一个，定位到首页
      router.push('/')
    } else {
      let pre_index = index - 1
      let pre_page = tagsViewList[pre_index]
      router.push(pre_page.fullPath)
    }


  }
}


/**
 * 关闭 menu
 */
const closeMenu = () => {
  visible.value = false
}

/**
 * 监听变化
 */
watch(visible, val => {
  if (val) {
    document.body.addEventListener('click', closeMenu)
  } else {
    document.body.removeEventListener('click', closeMenu)
  }
},
  {
    immediate: true
  })


</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
.tags-view-container {
  width: 100%;
  height: 36px;
  background: #fff;
  border-bottom: 1px dashed  #d8dce5;
  // margin-top: 10px;
  padding: 0 16px;
  // @include flex-box($wrap: nowrap);
  .tags-view-item {
    border-radius: 8px 8px 0px 0px;
    display: inline-block;
    position: relative;
    cursor: pointer;
    height: 30px;
    line-height: 30px;
    border: 1px solid #e9e9e9 !important;
    color: rgba(0, 0, 0, 0.8);
    background: rgb(247, 247, 247);
    padding: 0 18px;
    font-size: 14px;
    margin-left: 5px;
    margin-top: 5px;
    &:first-of-type {
      margin-left:0;
    }

    &:last-of-type {
      margin-right: 15px;
    }

    &.active,&:hover {
      color: hwb(160 0% 35%);
      background-color: white;
    }

    // close 按钮
    .el-icon-close {
      height: 1em;
      width: 1em;
      line-height: 10px;
      vertical-align: -2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;

      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }

      &:hover {
        background-color: #cfe6da;
        color: #fff;
      }
    }

  }
}
</style>

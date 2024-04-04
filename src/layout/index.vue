<template>
  <div class="app-wrapper" :class="[$store.getters.sidebarOpened ? 'openSidebar' : 'hideSidebar']">
    
    <!-- 左侧 menu -->
    <sidebar id="guide-sidebar" class="sidebar-container" :style="{ backgroundColor: variables.menuBg }" />

    <div class="main-container">
      <div class="fixed-header">
        <!-- 顶部的 navbar -->
        <navbar />
        <!-- tags -->
        <tags-view></tags-view>
      </div>
      <!-- 内容区 -->
      <div class="container">
        <app-main />
      </div>
    </div>
  </div>
</template>

<script setup>
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import AppMain from './components/AppMain'
import variables from '@/styles/variables.module.scss'
import TagsView from '@/components/TagsView'
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@import '@/styles/variables.module.scss';


.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  .progress {
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
    width: 100%;
  }
  .main-container {
    .container {
     margin-top: 99px;
    }
    .fixed-header {
      position: fixed;
      top: 0;
      right: 0;
      z-index: 9;
      width: calc(100% - #{$sideBarWidth});
      transition: width #{$sideBarDuration};
    }
  }  
}
</style>

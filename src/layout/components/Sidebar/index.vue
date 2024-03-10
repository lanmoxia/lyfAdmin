<template>
  <div class="menu-wrapper">
    <div class="logo-container" :class="$store.getters.sidebarOpened ? '' : 'hideSidebar'">
     <h1>Logo</h1>
     <!-- <svg-icon icon="logo" size="50"/> -->
    </div>
    <el-scrollbar wrap-style="background: '#787878;'">
      <sidebar-menu></sidebar-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import SidebarMenu from "./SidebarMenu";
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
.menu-wrapper{
  height: 100%;
  .logo-container {
    font-size: 16px;
    font-weight: 600;
    color: #00a76f;
    @include flex-box-set();
    margin: 20px 5px 20px 5px;
    &.hideSidebar {
      font-size: 9px;
      font-weight: 700;
      @include flex-box-set($jc: start);
    }
  }
}

</style>

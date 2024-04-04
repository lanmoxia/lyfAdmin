<template>
  <!-- 一级 menu 菜单 -->
  <el-menu style="--el-menu-bg-color: #ffffff;" :collapse="!$store.getters.sidebarOpened" :default-active="activeMenu"
    :background-color="$store.getters.cssVar.menuBg" :text-color="$store.getters.cssVar.menuText"
    :active-text-color="$store.getters.cssVar.menuActiveText" :unique-opened="false" router>
    <sidebar-item v-for="item in routes" :key="item.path" :route="item"></sidebar-item>
  </el-menu>
</template>
<script setup>
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { filterRouters, generateMenus } from "@/utils/route";
import SidebarItem from "./SidebarItem";

const router = useRouter();
const routes = computed(() => {
  // filterRouters => 过滤脱离层级的路由 
  // 比如 一级有一个home菜单，下边
  const filterRoutes = filterRouters(router.getRoutes()); // router.getRoutes() 当前路由实例中所有路由数组
  return generateMenus(filterRoutes);
});
// 计算高亮 menu 的方法
const route = useRoute();
const activeMenu = computed(() => {
  const { path } = route;
  return path;
});
</script>

<style lang="scss" scoped>

</style>
  
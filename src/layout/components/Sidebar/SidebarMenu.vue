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
  // filterRouters : 剔除一级路由和其他子路由path相同的一级路由
  const filterRoutes = filterRouters(router.getRoutes());
  // generateMenus: 剔除公共路由比如 401，403，login, home有 meta 保留
  return generateMenus(filterRoutes);
})


// 计算高亮 menu 的方法
const route = useRoute();
// 启用 vue-router 模式
const activeMenu = computed(() => {
  const { path } = route;
  return path;
});
</script>

<style lang="scss" scoped>

</style>
  
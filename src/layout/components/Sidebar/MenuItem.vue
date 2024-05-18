<template>
  <template v-if="icon">
  <svg-icon :icon="icon" :size="20"/>
  </template>
  <span :style="icon?'':'margin-left: 5px'">{{ title }}</span>
</template>

<script setup>
  defineProps({
    title: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true,
      default: ''
    }
  })
</script>

<style lang="scss" scoped>
/**
 * svg 文档图标样式单独控制
 */
.svg-document{
  margin-right: 10px;
}

// .sub-el-icon{
//   width: 1em;
//   height: 1em;
//   color: currentColor;
// }
</style>

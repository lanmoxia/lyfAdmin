<template>
  <template v-if="icon">
    <svg-icon :icon="icon" size="15"/>
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
      required: true
    }
  })
</script>

<style lang="scss" scoped>
  .sub-el-icon{
    width: 1em;
    height: 1em;
    color: currentColor;
  }

</style>

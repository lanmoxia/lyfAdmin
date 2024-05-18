<template>

  <!-- 外部图标样式 -->
  <div v-if="isExternal" 
    :style="styleExternalIcon" 
    class="svg-external-icon svg-icon" 
    :class="className" />
  <!-- SVG 文档 图标样式 -->
  <div v-else-if="isSvgDocument" 
    :style="{color: props.color}" v-html="iconSvgSource" 
    class="svg-document" 
    :class="className"></div>
  <!-- 内部 SVG 图标样式 -->
  <svg v-else class="svg-icon" 
    :class="className" 
    aria-hidden="true" 
    :style="{ color, width: size, height: size }">
    <use :xlink:href="iconName" :fill="color"/>
  </svg>
</template>

<script setup>
import { isExternal as external } from '@/utils/validate'
import {computed } from 'vue'
const props = defineProps({
  // icon 图标
  icon: {
    type: String,
    required: true
  },
  // 图标类名
  className: {
    type: String,
    default: ''
  },
  color: {
		type: String,
		default: '$919eab'
	},
	size: {
		type: [String, Number],
		default: '18'
	}
})

/**
 * 判断图标为 SVG 文档
 */
const isSvgDocument = computed(() => props.icon.trim().startsWith('<svg'))
/**
 * SVG 文档样式只能 JS 设置生效
 */
 const iconSvgSource = computed(() => {
  let svg = props.icon
  svg = svg.replace(/width="(\d+)?"/g, `width="${props.size}"`) 
  svg = svg.replace(/height="(\d+)?"/g, `height="${props.size}"`) 
  return svg
})


/**
 * 判断是否为外部图标
 */
const isExternal = computed(() => external(props.icon))
/**
 * 外部图标样式
 */
const styleExternalIcon = computed(() => ({
  mask: `url(${props.icon}) no-repeat 50% 50%`,
  '-webkit-mask': `url(${props.icon}) no-repeat 50% 50%`
}))
/**
 * 项目内图标
 */
const iconName = computed(() => `#icon-${props.icon}`)
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}

.svg-document{
  fill: currentColor;
  display: flex;
  align-items: center;
}
</style>

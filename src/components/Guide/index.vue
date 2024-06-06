<template>
  <div>
    <el-tooltip content="功能引导">
      <svg-icon id="guide-start" icon="guide" size="22" color="#5a5e66" @click="onClick" />
    </el-tooltip>
  </div>
</template>

<script setup>
import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'
import { onMounted } from 'vue'
import step from './step'


let driver = null
onMounted(() => {
  driver = new Driver({
    allowClose: false, //是否允许点击覆盖阴影关闭 
    animate: false, //是否在切换时使用动画
    opacity: 0.75,
    padding: 10,
    overlayClickNext: false, // 是否点击覆盖阴影时下一步
    doneBtnText: "完成", //完成按钮的文字
    stageBackground: "#ffffff",
    closeBtnText: '关闭',
    nextBtnText: '下一个',
    prevBtnText: '上一个'
  })
})

const onClick = () => {
  driver.defineSteps(step)
  driver.start()
}
</script>

<style scoped></style>

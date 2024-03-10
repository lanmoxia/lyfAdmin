<template>
  <div class="container" id="doubleLine"></div>
</template>

<script setup>
import * as echarts from 'echarts'
import { onMounted, nextTick, watchEffect} from 'vue'
import {doubLineOptions} from '../../options'
  onMounted(() => {
    nextTick(() => {
      initChart()
    })
  })

  const initChart = () => {
    let chartDom = document.getElementById('doubleLine')
    // 避免多个 echart dom 实例 判断消除
    if (echarts.getInstanceByDom(chartDom)) {
      echarts.dispose(chartDom)
    }
    let myChart = echarts.init(chartDom)
    myChart.setOption(doubLineOptions)
  }
  watchEffect(() => {
    nextTick(() => {
      initChart()
  })
})
</script>

<style lang="scss" scoped>
  .container{
    width: 100%;
    height: 100%;
  }
</style>
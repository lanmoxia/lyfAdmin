<template>
  <div class="echartsWrapper">
    <div class="source">
      <div class="sourceTitle">
        Total Active Users
      </div>
      <div class="sourceIcon">
        <svg-icon class-name="svgIcon" :icon="iconName" size="20" :color="iconColor"/>
        <span>+2.6%</span>
      </div>
      <span>18,765</span>
      </div>
      <div class="container" :id="uniqueId"></div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import { onMounted, nextTick, watchEffect} from 'vue'
import {lineOptions} from '../../options'

  onMounted(() => {
    nextTick(() => {
      initChart()
    })
  })
  const props = defineProps({
    uniqueId: {
      type: String,
      required: true
    },
    iconName: {
      type: String,
      default: 'up'
    },
    iconColor: {
      type: String,
      default: '#3ccc71'
    }
  })
  const initChart = () => {
    let chartDom = document.getElementById(props.uniqueId)
    // 避免多个 echart dom 实例 判断消除
    if (echarts.getInstanceByDom(chartDom)) {
      echarts.dispose(chartDom)
    }
    let myChart = echarts.init(chartDom)
    myChart.setOption(lineOptions) // 47 行
  }
watchEffect(() => {
  nextTick(() => {
    initChart()
  })
})
</script>

<style lang="scss" scoped>
.echartsWrapper {
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0;
  padding: 20px 24px;
  border-radius: 16px;
  background-color: rgb(255, 255, 255);
  box-shadow: rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px;
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  .source {     
    color: #3f3f3f;
    margin-right: 20px;
    >span{
      color: black;
      font-size: 22px;
      font-weight: 700;
      line-height: 16px;
    }
    .sourceTitle {
      font-size: 14px;
      font-weight: 600;
      line-height: 16px;
    }
    .sourceIcon {
      margin: 20px 0;
      display: flex;
      align-items: center;
      >span {
        font-size: 15px;
      }
      .svgIcon{
        margin-right: 10px;
        background: #e5e5e5;
        padding: 3px;
        border-radius: 50%;
      }
    }
  }
  .container{
    width: 250px;
    height: 100px;
  }
}
</style>
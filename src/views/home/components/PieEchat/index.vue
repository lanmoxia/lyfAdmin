<template>
  <div class="container" id="pie"></div>
</template>

<script setup>
  import * as echarts from 'echarts'
  import { onMounted, nextTick} from 'vue'
  import {pieOptions} from '../../options'

  onMounted(() => {
    nextTick(() => {
      initChart()
    })
  })

  // 默认高亮
  const currentHighlight = (myChart) => {
    let index = 0 // 高亮索引
    myChart.dispatchAction({
      type: "highlight",
      seriesIndex: index,
      dataIndex: index
    });
    myChart.on("mouseover", function(e) {
      if (e.dataIndex != index) {
        myChart.dispatchAction({
          type: "downplay",
          seriesIndex: 0,
          dataIndex: index
        });
      }
    });
    myChart.on("mouseout", function(e) {
      index = e.dataIndex;
      myChart.dispatchAction({
        type: "highlight",
        seriesIndex: 0,
        dataIndex: e.dataIndex
      })
    })
  }

  const initChart = () => {
    let chartDom = document.getElementById('pie')
    let myChart = echarts.init(chartDom)
    myChart.setOption(pieOptions)
    currentHighlight(myChart)
  }
</script>

<style lang="scss" scoped>
  .container{
    width: 350px;
    height: 350px;
  }
</style>
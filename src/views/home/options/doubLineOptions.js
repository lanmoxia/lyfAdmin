import * as echarts from 'echarts'

const doubLineOptions = {
  title: {
    show: true,
    text: 'Stacked Area Chart',
    color: '#3f3f3f',
    fontWeight: "600",
    fontSize: "17px"
  },
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(255,255,255,0.8)',
    axisPointer: {
      type: 'line',
      lineStyle: {
        color: 'transparent'  // 鼠标指示器线
      },
      label: {
        backgroundColor: '#6a7985'
      }
    }
  },
  legend: {
    icon: 'circle',
    left: 'right',
    top: '5%',
    data: ['China', 'America'],
    itemHeight: 10, // 图标大小
    itemWidth: 18, // 图标文字间距
    fontSize: 12,
    lineHeight: 14,
    rich: {
      a: {
        verticalAlign: 'middle',
      },
    },
    padding: [0, 0, -2, 0],  //[上、右、下、左]
  },

  grid: {
    left: '3%',
    right: '4%',
    bottom: '0',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category', // 类目轴
      boundaryGap: false, // 坐标轴两边留白
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      axisLine: {
        show: false
      },
      axisLabel: { // 刻度文字颜色
        color: "#bfbfbf"
      },
      axisTick: { // 刻度设置
        show: false
      },
    }
  ],
  yAxis: [
    {
      type: 'value',
      axisLabel: { // 刻度文字颜色
        color: "#bfbfbf"
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed',
          color: '#e8e8e8'
        }
      }
    }
  ],
  series: [
    {
      name: 'China',
      smooth: true, // 折线变平滑
      type: 'line',
      symbol: 'circle',
      symbolSize: 10,
      areaStyle: { // 折线背景
        color: new echarts.graphic.LinearGradient(
          0, 0, 0, 1, // x, y, x2, y2，其中y2为1表示从上到下
          [
            { offset: 0, color: 'rgba(216, 242, 233)' }, // 折线图顶部颜色
            { offset: 1, color: 'rgba(253, 254, 254)' }  // 折线图底部颜色，透明度为0
          ]
        )
      },
      symbol: 'circle',
      symbolSize: 10,
      showSymbol: false,
      cursor: "pointer",
      lineStyle: { // 折线和圆点颜色
        color: '#00a76f',
        width: 3
      },
      itemStyle: {
        color: '#00a76f',
      },
      emphasis: {
        focus: 'series'
      },
      data: [51, 35, 41, 10, 91, 69, 62, 148, 91, 35, 51]
    },
    {
      name: 'America',
      smooth: true, // 折线变平滑
      type: 'line',
      stack: 'Total',
      areaStyle: { // 跟填充有关
        color: new echarts.graphic.LinearGradient(
          0, 0, 0, 1, // x, y, x2, y2，其中y2为1表示从上到下
          [
            { offset: 0, color: 'rgba(255, 234, 227)' }, // 折线图顶部颜色
            { offset: 1, color: 'rgba(255, 253, 252)' }  // 折线图底部颜色，透明度为0
          ]
        )
      },
      symbol: 'circle',
      symbolSize: 10,
      showSymbol: false,
      cursor: "pointer",
      lineStyle: { // 折线和圆点颜色
        color: '#ff5630',
        width: 3
      },
      itemStyle: {
        color: '#ff5630',
      },
      emphasis: {
        focus: 'series'
      },
      data: [56, 13, 34, 10, 77, 99, 88, 45, 13, 56, 77]
    }
  ]
}

export default doubLineOptions
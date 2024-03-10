const lineOptions = {
  xAxis: {
    show: false,
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Stp', 'Woo', 'Foo']
  },
  yAxis: {
    type: 'value',
    show: false
  },
  grid: {
    x: 0,
    x2: 0,
    y: 30,
    y2: 0
  },
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(255,255,255,0.8)',
    axisPointer: {
      type: 'line',
      lineStyle: {
        color: 'transparent'  // 鼠标指示器线
      }
    }
  },
  series: [
    {
      data: [230, 130, 330, 320, 530, 580, 480, 330, 600, 420],
      type: 'line',
      smooth: true,
      symbol: 'circle',
      symbolSize: 10,
      showSymbol: false,
      cursor: "pointer",
      lineStyle: {
        color: '#00a76f',
        width: 3
      },
      itemStyle: {
        color: '#00a76f',
      }
    }
  ]
}

export default lineOptions

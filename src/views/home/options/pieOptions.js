
const pieOptions = {
  title: {
    show: true,
    text: 'Current Download',
    color: '#3f3f3f',
    fontWeight: "600",
    fontSize: "17px"
  },
  tooltip: {
    show: true,
    trigger: 'item',
    backgroundColor: 'rgba(255,255,255,0.8)', // 浮层提示显示背景
    borderColor: '#fff' // 边框背景
  },
  legend: {
    show: true, // 标题
    selectedMode: false, // 禁止选中（下边标题项选择无效）
    bottom: 'bottom', // 标题显示位置
    icon: 'circle',
    itemHeight: 10, // 图标大小
    itemWidth: 18, // 图标文字间距
    fontSize: 12,
    lineHeight: 14,
    padding: [0, 0, -2, 0],  //[上、右、下、左]
    rich: {
      a: {
        verticalAlign: 'middle',
      }
    }
  },
  color: ['#009e69', '#ff7849', '#00b8d9', '#ff5630'],
  series: [
    {
      type: 'pie',
      radius: ['72%', '80%'],
      center: ["50%", "50%"],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: 'center', // 中间显示的文字
      },
      emphasis: {
        focus: 'series',
        blurScope: 'coordinateSystem',
        label: {
          show: true,
          lineHeight: 40,
          formatter: [
            '{b|{b}}',
            '{c|{c}}'
          ].join('\n'),
          rich: {
            b: {
              color: 'inherit',
              fontSize: '15',
            },
            c: {
              color: '#1f1f1f',
              fontSize: '25',
              fontWidth: '700'
            }
          }
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 44, name: 'Mac' },
        { value: 55, name: 'Window' },
        { value: 13, name: 'IOS' },
        { value: 43, name: 'Android' },
      ]
    }
  ]
}
export default pieOptions
const DEFAULT_ECHARTS_OPTIONS = {
  grid: {
    left: '3%',
    right: '4%',
    bottom: '6%',
    containLabel: true
  },
  lengend: {
    itemWidth: 10,
    itemHeight: 10
  },
  confine: false,
  color: ['#5182E4', '#F7CB4A', '#3FB27E', '#F88D48', '#9BCC66', '#F25252', '#CE62D6', '#5156B8', '#51B4F1', '#F25252', '#D42D6B'],
  textStyle: {
    color: '#666'
  },
  axisLine: {
    lineStyle: {
      color: '#666'    
    }
  },
  splitLine: {
    lineStyle: {
      color: 'rgba(158, 158, 158, 0.3)',
      type: 'dashed'
    }
  },
  splitArea: {
    areaStyle: {
        // 使用深浅的间隔色
      color: ['transparent', 'rgba(158, 158, 158, 0.8)']
    }
  },
  radar_splitLine: {
    lineStyle: {
      color: 'rgba(158, 158, 158, 0.8)'
    }
  },
  axisLabel:{  
    interval: 0,//横轴信息全部显示  
    rotate: 0,//-45度角倾斜显示  
    formatter: function (value) {
      return value && value.length > 14 ? value.substr(0, 13) + '...' : value;
    },
    textStyle: {
      color: '#666'
    }
  },  
  table_header_color: '#eee',
  scattrer_shadow_color: 'transparent',
  scattrer_start_color: '#15c9ff',
  scattrer_end_color: '#527DFD',
  scatter_map_color: ['#C2EFFF','#62CDFF','#fff']
};

const RESERVE_OPTION_MAPS = {
  'sum': '求和',
  'avg': '平均值',
  'count': '计数',
  'year': '按年',
  'month': '按月',
  'day': '按日'
}

export {
  DEFAULT_ECHARTS_OPTIONS,
  RESERVE_OPTION_MAPS
};
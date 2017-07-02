<template>
  <div class="container">
    <div ref="chart" class="chart-conatiner"></div>
  </div>
</template>


<script>
  import echarts from 'echarts';

  import fmtAxias from '../utils/fmtAxias';
  import fmtSeries from '../utils/fmtSeries';

  import {DEFAULT_ECHARTS_OPTIONS} from '../constants';

  export default {

    mounted() {
      if (this.chartData) {
        this.drawChart();
      }
    },

    props: {
      // 父级传入data
      chartData: {
        type: Object,
        default: null
      }
    },

    data(){
      return {
        
      }
    },

    methods: {
      // 绘制图表
      drawChart() {
        const chartDom = this.$refs.chart;
        const chartObj = echarts.init(chartDom);
        chartObj.setOption(this.getChartOpts());
      },

      // 获取图标配置
      getChartOpts() {

        const chart_data = this._convertData(this.chartData);

        return {
          color: DEFAULT_ECHARTS_OPTIONS.color,
          tooltip : {
            trigger: 'axis',
            confine: DEFAULT_ECHARTS_OPTIONS.confine,
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            ...DEFAULT_ECHARTS_OPTIONS.lengend,
            data: chart_data.legend,
            textStyle: DEFAULT_ECHARTS_OPTIONS.textStyle
          },
          grid: DEFAULT_ECHARTS_OPTIONS.grid,
          xAxis: [{
            type : 'category',
            data : chart_data.xAxis,
            axisLine: DEFAULT_ECHARTS_OPTIONS.axisLine,
            axisLabel: {
              ...DEFAULT_ECHARTS_OPTIONS.axisLabel,
              rotate: this.$refs.chart.clientWidth * 0.93 > chart_data.xAxis.length * 80 ? 0 : 45,
              formatter: value => {
                let length = this.$refs.chart.clientHeight * 0.06 / 7
                return (value && value.length > length && this.$refs.chart.clientWidth * 0.93 < chart_data.xAxis.length * 80) ? `${value.substr(0, length)}...` : value
              }
            }
          }],
          yAxis: [{
            type : 'value',
            axisLine: DEFAULT_ECHARTS_OPTIONS.axisLine,
            splitLine: DEFAULT_ECHARTS_OPTIONS.splitLine,
            axisLabel: {
              ...DEFAULT_ECHARTS_OPTIONS.axisLabel,
              formatter: value => fmtAxias(value)
            }
          }],
          series: chart_data.series,
          dataZoom: [{
            type: 'inside',
            startValue: 0,
            endValue: 10
          }]
        }
      },

      // 转化数据
      _convertData(data) {

        let legend = []
        let series = []
        let xAxis = []
        // 转成数据
        let dims = Object.entries(data.dims) 

        // dims nums data 的数组长度是一样的。
        // dims 
        // 用第一列的数据进行排序
        let serialize = []

        data.nums && Object.keys(data.nums) && Object.keys(data.nums).forEach((item,i) => {
          legend.push(item)

          let _series = {
            name: '直接访问',
            type: 'bar',
            data: [320, 332, 301, 334, 390, 330, 320]
          };
          _series.name = item
          _series.data = data.nums[item].map(value => fmtSeries(value))
          
          data.nums[item].forEach((d, i) => {
            let _xaxis = []
            dims.forEach(item => {
              _xaxis.push(item[1][i])
            })
            xAxis.push(_xaxis.join('-'))
          })

          // 如果 serialize 存在/
          if (serialize.length > 0) {
            // 清空原数据
            let data = []
            xAxis = []
            serialize.forEach(index => {
              let _xaxis = []
              data.push(_series.data[index])
              dims.forEach(item => {
                _xaxis.push(item[1][index])
              })
              xAxis.push(_xaxis.join('-'))
            })
            _series.data = data
          }
          series.push(_series)
        })

        return {
          legend,
          xAxis,
          series
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .container{
    height: 100%;
    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    .chart-conatiner {
      height: 100%;
      width: 100%;
      padding: 20px 0;
      box-sizing: border-box;
    }
  }
</style>
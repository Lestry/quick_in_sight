<template>
  <div class="container">
    <div ref="chart" class="chart-conatiner"></div>
  </div>
</template>


<script>
  import echarts from 'echarts';

  import fmtNumber from '../utils/fmtNumber';
  
  import {DEFAULT_ECHARTS_OPTIONS} from '../constants';

  export default {

    mounted() {
      if (this.chartData) {
        this.drawChart();
      }
    },

    props: {
      chartData: {
        type: [Object, Array],
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
        const data = this.chartData;

        let chartData = this._convertData(data)
        let total_data = 0

        // 百分比 补全, 由于echarts 再统计 百分比的时候。会四舍五入
        data.forEach(item => {
          total_data += item.value
        })

        let total_percent = 0
        data.forEach((item, index) => {
          if (index == data.length - 1) {
            item.percent = 1 - total_percent
          } else {
            item.percent = Number(item.value / total_data).toFixed(4)
            total_percent += +item.percent
          }
        })

        return  {
          color: DEFAULT_ECHARTS_OPTIONS.color,
          tooltip : {
            trigger: 'item',
            formatter: _data => {
              let index = _data.dataIndex
              let percent = data[index].percent * 100 
              return `${_data.data.name} : ${fmtNumber(_data.value)} (${Number(percent).toFixed(2)}%)`
            },
            confine: DEFAULT_ECHARTS_OPTIONS.confine
          },
          grid: DEFAULT_ECHARTS_OPTIONS.grid,
          legend: {
            ...DEFAULT_ECHARTS_OPTIONS.lengend,
            data: chartData.legend,
            textStyle: DEFAULT_ECHARTS_OPTIONS.textStyle,
          },
          series : [
            chartData.series
          ]
        }
      },

      // 转化数据
      _convertData(data) {
        let seriesTmpl = {
          type: 'pie',
          radius : '55%',
          center: ['50%', '60%'],
          data:[
            {value:335, name:'直接访问'},
            {value:310, name:'邮件营销'},
            {value:234, name:'联盟广告'},
            {value:135, name:'视频广告'},
            {value:1548, name:'搜索引擎'}
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }

        seriesTmpl.data = Array.isArray(data) ? data : []
        seriesTmpl.data = seriesTmpl.data.map(item => {
          return {
            ...item,
            value: Number(+item.value).toFixed(2) || 0
          }
        })

        return {
          legend: Array.isArray(data) ? data.map(item => item.name) : [],
          series: seriesTmpl
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .container{
    height: 100%;
    width: 100%;
    .chart-conatiner {
      height: 100%;
      width: 100%;
      padding: 20px 0;
      box-sizing: border-box;
    }
  }
</style>
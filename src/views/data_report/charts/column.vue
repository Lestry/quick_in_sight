<template>
  <div class="container">
    <div ref="chart" class="chart-conatiner"></div>
  </div>
</template>


<script>
  import echarts from 'echarts';
  import {DEFAULT_ECHARTS_OPTIONS} from '../constants';
  import fmtAxias from '../utils/fmtAxias';

  export default {

    mounted() {
      this.drawChart();
    },

    components: {

    },

    data(){
      return {
        
      }
    },

    methods: {
      drawChart() {
        const chartDom = this.$refs.chart;
        console.log(chartDom);
        const chartObj = echarts.init(chartDom);
        console.log(chartObj);
        chartObj.setOption(this.getChartOpts());
      },

      getChartOpts() {
        const chart_data = {
          legend: ['名称（计数）'],
          xAxis: ['北京', '武汉'],
          series: [{
            data: [22, 101],
            name: '名称（计数）',
            type: 'bar'
          }]
        };

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
          series: chart_data.series
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
    }
  }
</style>
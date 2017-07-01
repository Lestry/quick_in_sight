<template>
  <div class="container">
    <div class="chart-title">{{title}}</div>

    <div class="chart-area">
      <ColumnChart v-if="currChartType === 'cluster_column'" 
      :key="uuid" 
      :chartData="fmtedData" 
      :chartWidth="chartWidth"/>
      <PieChart v-if="currChartType === 'pie'" 
      :key="uuid" 
      :chartData="fmtedData" 
      :chartWidth="chartWidth"/>
      <LineChart v-if="currChartType === 'line'" 
      :key="uuid" 
      :chartData="fmtedData" 
      :chartWidth="chartWidth"/>
    </div>

    <loading v-model="pending" :text="loadingText"></loading>

    <loading v-model="recording" text="语音输入中..."></loading>

    <div class="bottom-area" @touchstart="handleStartRecord" @touchend="handleStopRecord" @touchcancel="handleStopRecord">
      <div class="voice-btn">
        <i class="dmpicon-mic"></i>
      </div>
    </div>
  </div>
</template>


<script>
  import wx from 'weixin-js-sdk';
 
  import {Loading} from 'vux';

  import ColumnChart from './charts/column';
  import PieChart from './charts/pie';
  import LineChart from './charts/line';

  import {getChartData} from '../../apis';

  import fmtChartData from './utils/fmtChartData';

  let recordTimer = 0;

  export default {

    mounted() {
      this.getChart(this.$route.params.voice);

      // this.setupData(this.$root.chart_data);
    },

    components: {
      Loading,
      PieChart,
      ColumnChart,
      LineChart
    },

    data(){
      return {
        uuid: new Date().getTime(),                         // 用于刷新图标组件
        recording: false,                                   // 录音状态
        pending: false,                                     // 图表加载状态
        loadingText: '努力加载中...',                        
        fmtedData: null,                                    // 格式化后的图标数据
        chartWidth: '100%',
        currChartType: 'cluster_column',                    // 当前图表类型
        title: '',                                          // 当前报告名称
        indicators: {
          dims: [],
          nums: []
        },
        data: []
      }
    },

    methods: {
      setupData(base_data) {
        const {dataset_fields, chart, data} = base_data;

        const fields = (Array.isArray(dataset_fields) && dataset_fields.length > 0) ? dataset_fields.map(d => d.id) : [];

        // 补全dims
        if (Array.isArray(chart.dims) && chart.dims.length > 0) {
          chart.dims = chart.dims.map(dim => {
            const newDim = dataset_fields[fields.indexOf(dim.dim)];
            return {
              ...dim,
              ...newDim
            };
          })
        }

        // 补全nums
        if (Array.isArray(chart.nums) && chart.nums.length > 0) {
          chart.nums = chart.nums.map(num => {
            const newNum = dataset_fields[fields.indexOf(num.num)];
            return {
              ...num,
              ...newNum
            };
          })
        }

        // 获取图表类型
        this.currChartType = chart.chart_code || 'cluster_column';

        // 提取报告名称
        this.title = chart.name || '';

        // 组织echart组件数据
        this.indicators = {
          dims: chart.dims || [],
          nums: chart.nums || []
        };

        this.data = Array.isArray(data) && data[0] ? data[0] : [];

        if (!chart.chart_code || chart.chart_code === 'cluster_column' || chart.chart_code === 'line' || Array.isArray(data) && data[0] && data[0].length > 16) {
          this.chartWidth = `${1.5 * data[0].length}rem`;
        }
        else {
          this.chartWidth = '100%';
        }

        this.fmtedData = fmtChartData(this.currChartType, this.indicators, this.data);

        this.uuid = new Date().getTime();
      },

      // 请求数据(用文字)
      getChart(text) {
        this.pending = true;

        getChartData(text, json => {
          this.pending = false;
          if (json.result) {
            this.setupData(json.data);
          } 
        }, err => {
          this.pending = false;
        });
      },

      // 录音开始/结束
      handleStartRecord() {
        if (this.recording) {
          return;
        }
        // 调用微信录音接口
        wx.startRecord({
          cancel: () => {
            this.$vux.toast.show({
              type: 'warn',
              text: '未授权录音'
            });
          }
        });

        this.recording = true;
        // 10秒后自动结束录音
        recordTimer = setTimeout(() => {
          this.handleStopRecord();
        }, 10000);
      },

      // 录音结束
      handleStopRecord(){
        if (!this.recording) {
          return;
        }
        // 取消定时操作
        clearTimeout(recordTimer);
        // 调用微信sdk结束录音
        wx.stopRecord({
          success: res => {
            const localId = res.localId;

            this.pending = true;

            this.loadingText = '语音识别中...';
            wx.translateVoice({
              localId,
              isShowProgressTips: 0,
              complete: res => {
                if (res.hasOwnProperty('translateResult')) {
                  console.log('识别结果：' + res.translateResult);
                  this.loadingText = '努力加载中...';
                  this.getChart(res.translateResult);
                } else {
                  this.pending = false;
                  this.$vux.toast.show({
                    type: 'warn',
                    text: '无法识别'
                  });
                }
              }
            })
          }
        });

        this.recording = false;
      }
    }
  }
</script>

<style lang="less" scoped>
  .container{
    .chart-title {
      line-height: 2.5rem;
      height: 2.5rem;
      width: 100%;
      color: #333;
      text-align: center;
    }
    .chart-area {
      position: absolute;
      left: 0;
      top: 2.5rem;
      right: 0;
      bottom: 2.5rem;
    }

    .bottom-area {
      position: absolute;
      left: 0;
      bottom: 0;
      right: 0;
      height: 2.5rem;
      padding: 0.2rem;
      box-sizing: border-box;
      box-shadow: 0 -1px 5px 0 rgba(200, 200, 200, .5);
      .voice-btn {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 4px;
        border: 1px solid #eee;
        .dmpicon-mic {
          font-size: 1.25rem;
          color: #999;
        }
      }
    }
  }
</style>
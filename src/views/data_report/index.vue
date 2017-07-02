<template>
  <div class="container">
    <div class="chart-title">{{title}}</div>

    <div class="chart-area">
      <ColumnChart v-if="currChartType === 'cluster_column' && fmtedData" 
      :key="uuid" 
      :chartData="fmtedData" 
      :chartWidth="chartWidth"/>
      <PieChart v-if="currChartType === 'pie' && fmtedData" 
      :key="uuid" 
      :chartData="fmtedData" 
      :chartWidth="chartWidth"/>
      <LineChart v-if="currChartType === 'line' && fmtedData" 
      :key="uuid" 
      :chartData="fmtedData" 
      :chartWidth="chartWidth"/>


      <div class="empty-text" v-if="!fmtedData && !recording && !pending">
        暂无数据
        <div class="secondary-text">
          请点击开始说出您的要求
        </div>
      </div>

      <div v-if="recording">
        <div class="wave-animate-frames wave-animate-frames-1"></div>
        <div class="wave-animate-frames wave-animate-frames-2"></div>
        <div class="wave-animate-frames wave-animate-frames-3"></div>
        <div class="wave-animate-frames wave-animate-frames-4"></div>
      </div>

      <div class="empty-text" v-if="recording">
        语音输入中...
        <div class="secondary-text">
          再次点击停止输入
        </div>
      </div>
    </div>

    <loading v-model="pending" :text="loadingText"></loading>

    <div class="bottom-area" @touchend="handleToggleRecord">
      <div :class="'voice-btn  ' + btnCls">
        <i class="dmpicon-mic" v-if="!recording"></i>
        <div class="effect-box">
          <b v-for="n in 40"></b>
        </div>
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
      this.getChart(this.$route.params.voice, null);

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
        defaultData: null,                                  // 原始数据
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

    computed: {
      btnCls() {
        return this.recording ? 'recording' : '';
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
      getChart(text, data) {
        this.pending = true;

        getChartData(text, data, json => {
          this.pending = false;
          if (json.result) {
            this.setupData(json.data);
            this.defaultData = json.data;

            console.log('-----------------', json.data);
          } else {
            this.defaultData = null;
            this.$vux.toast.show({
              type: 'warn',
              text: json.msg
            });
          }
        }, err => {
          this.pending = false;
          this.defaultData = null;
        });
      },

      // 录音开始/结束
      handleToggleRecord(e) {
        e.stopPropagation();

        if (this.recording) {
          this.stopRecord();
        } else {
          this.recording = true;
          // 调用微信录音接口
          wx.startRecord({
            cancel: () => {
              this.$vux.toast.show({
                type: 'warn',
                text: '未授权录音'
              });
            }
          });
          // 10秒后自动结束录音
          recordTimer = setTimeout(() => {
            this.stopRecord();
          }, 10000);
        }
      },

      // 录音结束
      stopRecord(){
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
      line-height: 1.1rem;
      height: 2.5rem;
      width: 100%;
      color: #333;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 1rem;
      box-sizing: border-box;
    }
    .chart-area {
      position: absolute;
      left: 0;
      top: 2.5rem;
      right: 0;
      bottom: 2.5rem;
      .wave-animate-frames {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        box-sizing: border-box;
        width: 0rem;
        height: 0rem;
        border-radius: 50%;
        z-index: 0;
        border: 1px solid rgba(72,141,251, 0.8);
        animation-name: waterwaves;
        animation-duration: 2s;
        animation-iteration-count: infinite;
        animation-timing-function: ease-in-out;
        &.wave-animate-frames-1 {
          animation-delay: 0s;
        }
        &.wave-animate-frames-2 {
          animation-delay: 0.5s;
        }
        &.wave-animate-frames-3 {
          animation-delay: 1s;
        }
        &.wave-animate-frames-4 {
          animation-delay: 1.5s;
        }
      }
      .empty-text {
        width: 100%;
        line-height: 1.2rem;
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        text-align: center;
        font-size: 1.5rem;
        color: #999;
        .secondary-text {
          padding-top: 0.5rem;
          color: #999;
          font-size: 1rem;
          font-weight: normal;
        }
      }
    }

    @keyframes waterwaves
    {
      0% {
        width: 0rem;
        height: 0rem;
        border-color: rgba(72,141,251, 0.8);
        border-width: 1px;
      }
      100% {
        width: 30rem;
        height: 30rem;
        border-color: rgba(72,141,251, 0);
        border-width: 1px;
      }
    }

    .bottom-area {
      user-select: none;
      -webkit-user-select: none;
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
        background: rgba(72,141,251, 1);
        .dmpicon-mic {
          font-size: 1.25rem;
          color: #fff;
        }
        .effect-box {
          display: none;
        }
        &.recording {
          .effect-box {
            display: flex;
            position: absolute;
            left: 0.25rem;
            right: 0.25rem;
            top: 0;
            bottom: 0;
            justify-content: space-around;
            align-items: center;
            b {
              width: 0.25rem;
              height: 1rem;
              display: block;
              background-color: rgba(255, 255, 255, .3);
              animation-name: height-change;
              animation-duration: .4s;
              animation-iteration-count: infinite;
              animation-timing-function: linear;
              &:nth-child(3n) {
                animation-delay: 0.25s;
              }
              &:nth-child(3n+1) {
                animation-delay: 0.6s;
              }
            }
          }
        }
      }
    }
  }

  @keyframes height-change 
  {
    0% {
      height: 0;
    }
    50% {
      height: 1rem;
    }
    100% {
      height: 0;
    }
  }
</style>
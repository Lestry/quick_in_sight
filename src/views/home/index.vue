<template>
  <div class="container">

    <div class="btn-container" @touchend="handleToggleRecord">

      <div class="mic-icon">
        <i class="dmpicon-mic"></i>
      </div>

      <div class="data-pending-ani" v-if="!recording && pending">
        
      </div>

      <div v-if="recording">
        <div class="wave-animate wave-animate-1"></div>
        <div class="wave-animate wave-animate-2"></div>
        <div class="wave-animate wave-animate-3"></div>
        <div class="wave-animate wave-animate-4"></div>
      </div>
    </div>

    <div class="recording-status">
      <div class="primary">{{primaryTip}}</div>
      <div class="secondary">{{secondaryTip}}</div>
    </div>

  </div>
</template>


<script>
  import wx from 'weixin-js-sdk';
  
  let recordTimer = 0;

  export default {

    mounted() {
      this.$router.push({
        name: 'dataReport',
        params: {
          voice: '语音输入的文字'
        }
      });
    },

    data(){
      return {
        recording: false,
        pending: false
      }
    },

    computed: {
      primaryTip() {
        if (this.pending && !this.recording) {
          return '正在识别并查询...';
        } else if (this.recording) {
          return '正在接收语音...';
        } else {
          return '点击说出指令';
        }
      },

      secondaryTip() {
        if (this.pending && !this.recording) {
          return '';
        } else if (this.recording) {
          return '点击停止说话';
        } else {
          return '通过语音查询数据报告';
        }
      }
    },

    methods: {
      // 录音开始/结束
      handleToggleRecord() {
        if (this.recording) {
          this.stopRecord();
        } else {
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

            wx.translateVoice({
              localId,
              isShowProgressTips: 0,
              complete: res => {
                if (res.hasOwnProperty('translateResult')) {
                  console.log('识别结果：' + res.translateResult);

                  this.$vux.toast.show({
                    type: 'success',
                    text: '识别结果：' + res.translateResult
                  });

                  this.pending = false;

                  this.$router.push({
                    name: 'dataReport',
                    params: {
                      voice: res.translateResult
                    }
                  });
                  
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
    .btn-container {
      width: 10rem;
      height: 10rem;
      line-height: 10rem;
      text-align: center;
      position: absolute;
      left: 50%;
      top: 40%;
      transform: translate(-50%, -50%);
      z-index: 9;

      .mic-icon {
        position: relative;
        z-index: 99;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: linear-gradient(-225deg, #527DFD 0%, #1BA3D8 100%);
        display: flex;
        justify-content: center;
        align-items: center;
        .dmpicon-mic {
          transform: translateX(2px);
          font-size: 4rem;
          color: #fff;
        }
      }

      .wave-animate {
        position: absolute;
        left: 0;
        top: 0;
        box-sizing: border-box;
        width: 10rem;
        height: 10rem;
        border-radius: 50%;
        z-index: 0;
        background-color: rgba(72,141,251, 0.8);
        animation-name: waterwave;
        animation-duration: 2s;
        animation-iteration-count: infinite;
        animation-timing-function: ease-in-out;
        &.wave-animate-1 {
          animation-delay: 0s;
        }
        &.wave-animate-2 {
          animation-delay: 0.5s;
        }
        &.wave-animate-3 {
          animation-delay: 1s;
        }
        &.wave-animate-4 {
          animation-delay: 1.5s;
        }
      }

      .data-pending-ani {
        position: absolute;
        left: -.5rem;
        top: -.5rem;
        box-sizing: border-box;
        width: 11rem;
        height: 11rem;
        border-radius: 50%;
        z-index: 1;
        border: 5px solid transparent;
        transform-origin: 50% 50%;
        border-top-color: rgba(72,141,251, .75);
        animation: rotate 0.8s linear infinite;
      }
    }

    .recording-status {
      position: absolute;
      bottom: 20%;
      z-index: 9;
      width: 100%;
      text-align: center;
      color: #666;
      .secondary {
        color: #999;
        font-size: 0.75rem;
        padding-top: 0.5rem;
      }
    }
  }


  @keyframes waterwave
  {
    0% {
      width: 10rem;
      height: 10rem;
      left: 0;
      top: 0;
      background-color: rgba(72,141,251, 0.8);
    }
    100% {
      width: 30rem;
      height: 30rem;
      left: -10rem;
      top: -10rem;
      background-color: rgba(72,141,251, 0);
    }
  }

  @keyframes rotate 
  {
    0% {
      transform: rotateZ(0deg);
    }
    50% {
      transform: rotateZ(180deg);
    }
    100% {
      transform: rotateZ(360deg);
    }
  }
</style>
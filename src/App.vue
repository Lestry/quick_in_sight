<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive>
        <router-view class="main-view slide-view" v-if="loaded"/>
      </keep-alive>
    </transition>
  </div>
</template>


<script>
  import {getSignature} from './apis';

  export default {
    name: 'index',

    mounted() {
      // test 放开
      // this.loaded = true;
      
      // 获取签名参数
      getSignature(json => {
        console.log('getSignature', json);
        // 返回数据格式
        // {
        //   "timestamp": 1498916939,
        //   "nonceStr": "JM9ya8Tujs647XL1",
        //   "appId": "wx7bc82d063226059e",
        //   "signature": "3743dafb6aaa8492c0ce5756cd00f9aa97fe0e23"
        // }
        if (json.result) {
          wx.config({
            timestamp: json.data.timestamp,
            nonceStr: json.data.nonceStr,
            appId: json.data.appId,
            signature: json.data.signature,
            debug: false,
            jsApiList: [
              'startRecord',
              'stopRecord',
              'translateVoice'
            ]
          });
        }
      });

      // 完成wx sdk的注入
      wx.ready(() => {
        this.loaded = true;
        console.log('wx-js-sdk is ready!!');
        // 主动触发一次录音 弹出授权窗口
        wx.startRecord({
          success: function(){
            wx.stopRecord();
          }
        });
      });
    },

    data () {
      return {
        loaded: false,
        transitionName: 'slide-left'
      }
    },

    watch: {
      '$route' (to, from) {
        this.transitionName = calcTransition(to, from);
      }
    }

  };

  let _pathHistory = [];
  // 进 slide-left    出 slide-right
  function calcTransition(to, from) {
    let name;
    if (_pathHistory.length == 0 && from.path) {
      _pathHistory.push(from.path);
      name = 'slide-left';
    } else {
      const lastIndex = _.lastIndexOf(_pathHistory, to.path);
      if (lastIndex !== -1) {
        // 如果进入的是过去的路由A，那么把路由A 后面的历史记录清除
        _pathHistory = _pathHistory.slice(0, lastIndex + 1);
        name = 'slide-right';
      } else {
        // 进入的不是过去的路由，那么就是『深入』
        _pathHistory.push(to.path);
        name = 'slide-left';
      }
    }
    return name;
  }

</script>


<style lang="less">
  @import '~vux/src/styles/reset.less';
  @import './static/css/style.css';

  body {
    background-color: #F2F6FB;
    color: #333;
    font-family: "Helvetica Neue", Helvetica, STHeiTi, sans-serif;
  }
  
  .main-view{
    width: 100%;
    height: auto;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
  
</style>
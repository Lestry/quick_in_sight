<template>
  <div class="container">
    <div class="chart-area">
      
    </div>

    <div class="bottom-area">
      <div class="voice-btn">
        <i class="dmpicon-mic"></i>
      </div>
    </div>
  </div>
</template>


<script>
  import Pie from './charts/pie';
  import Column from './charts/column';
  import Line from './charts/line';
  import Radar from './charts/radar';
  import echarts from 'echarts';

  export default {

    activated(){

    },

    updated(){
      
    },

    components: {

    },

    data(){
      return {
        
      }
    },

    methods: {
      
    }
  }
</script>

<style lang="less" scoped>
  .container{
    .chart-area {
      position: absolute;
      left: 0;
      top: 0;
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
webpackJsonp([1],{122:function(t,e,n){"use strict";n.d(e,"b",function(){return c}),n.d(e,"a",function(){return u});var i=n(123),a=n.n(i),s=n(204),o=n.n(s),r=o.a.create({baseURL:"https://dmp-dbeta.mypaas.com.cn/api/",timeout:1e3,headers:{"content-type":"application/json"}}),c=function(t,e,n){r({url:"/quick_insight/text?t="+(new Data).getTime(),method:"POST",data:a()({},t,{tenant_code:"beta"})}).then(function(t){"function"==typeof e&&e(t.data)}).catch(function(t){console.log("Get chart data api failed: ",t),"function"==typeof n&&n(t)})},u=function(t,e){r({url:"/quick_insight/signature?t="+(new Data).getTime(),method:"POST"}).then(function(e){"function"==typeof t&&t(e.data)}).catch(function(t){console.log("Get wexin signature failed: ",t),"function"==typeof e&&e(t)})}},200:function(t,e,n){"use strict";var i=n(116),a=n(532),s=n(540),o=n.n(s),r=n(539),c=n.n(r);i.a.use(a.a),e.a=new a.a({mode:"history",routes:[{path:"/",name:"Home",component:o.a},{path:"/data_report",name:"DataReport",component:c.a},{path:"*",redirect:"/"}]})},203:function(t,e,n){n(518);var i=n(30)(n(226),n(529),null,null);t.exports=i.exports},222:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(116),a=n(202),s=n.n(a),o=n(200),r=n(203),c=n.n(r),u=n(201);i.a.use(u.a),s.a.attach(document.body),i.a.config.productionTip=!1,new i.a({router:o.a,render:function(t){return t(c.a)}}).$mount("#app-box")},223:function(t,e,n){"use strict";n.d(e,"a",function(){return i});var i={grid:{left:"3%",right:"4%",bottom:"6%",containLabel:!0},lengend:{itemWidth:10,itemHeight:10},confine:!1,color:["#5182E4","#F7CB4A","#3FB27E","#F88D48","#9BCC66","#F25252","#CE62D6","#5156B8","#51B4F1","#F25252","#D42D6B"],textStyle:{color:"#666"},axisLine:{lineStyle:{color:"#666"}},splitLine:{lineStyle:{color:"rgba(158, 158, 158, 0.3)",type:"dashed"}},splitArea:{areaStyle:{color:["transparent","rgba(158, 158, 158, 0.8)"]}},radar_splitLine:{lineStyle:{color:"rgba(158, 158, 158, 0.8)"}},axisLabel:{interval:0,rotate:0,formatter:function(t){return t&&t.length>10?t.substr(0,9)+"...":t},textStyle:{color:"#666"}},table_header_color:"#eee",scattrer_shadow_color:"transparent",scattrer_start_color:"#15c9ff",scattrer_end_color:"#527DFD",scatter_map_color:["#C2EFFF","#62CDFF","#fff"]}},224:function(t,e,n){"use strict";function i(t){var e=t;if(t/s>=1){var n=Number(t/s).toString();e=(n.split(".").length>4?Number(n).toFixed(4):Number(n))+" 亿"}else if(t/a>=1){var i=Number(t/a).toString(),o=i.split("."),r=o.length>4?Number(i).toFixed(4):Number(i);e=r+" 万"}return e}e.a=i;var a=1e4,s=1e8},225:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(234);e.default={name:"toast",mixins:[i.a],props:{value:Boolean,time:{type:Number,default:2e3},type:{type:String,default:"success"},transition:String,width:{type:String,default:"7.6em"},isShowMask:{type:Boolean,default:!1},text:String,position:String},data:function(){return{show:!1}},created:function(){this.value&&(this.show=!0)},computed:{currentTransition:function(){return this.transition?this.transition:"top"===this.position?"vux-slide-from-top":"bottom"===this.position?"vux-slide-from-bottom":"vux-fade"},toastClass:function(){return{"weui-toast_forbidden":"warn"===this.type,"weui-toast_cancel":"cancel"===this.type,"weui-toast_success":"success"===this.type,"weui-toast_text":"text"===this.type,"vux-toast-top":"top"===this.position,"vux-toast-bottom":"bottom"===this.position,"vux-toast-middle":"middle"===this.position}},style:function(){if("text"===this.type&&"auto"===this.width)return{padding:"10px"}}},watch:{show:function(t){var e=this;t&&(this.$emit("input",!0),this.$emit("on-show"),this.fixSafariOverflowScrolling("auto"),clearTimeout(this.timeout),this.timeout=setTimeout(function(){e.show=!1,e.$emit("input",!1),e.$emit("on-hide"),e.fixSafariOverflowScrolling("touch")},this.time))},value:function(t){this.show=t}}}},226:function(t,e,n){"use strict";function i(t,e){var n=void 0;if(0==s.length&&e.path)s.push(e.path),n="slide-left";else{var i=_.lastIndexOf(s,t.path);-1!==i?(s=s.slice(0,i+1),n="slide-right"):(s.push(t.path),n="slide-left")}return n}Object.defineProperty(e,"__esModule",{value:!0});var a=n(122);e.default={name:"index",mounted:function(){var t=this;n.i(a.a)(function(t){console.log("getSignature",t),t.result&&wx.config({timestamp:t.data.timestamp,nonceStr:t.data.nonceStr,appId:t.data.appId,signature:t.data.signature,debug:!1,jsApiList:["startRecord","stopRecord","translateVoice"]})}),wx.ready(function(){t.loaded=!0,console.log("wx-js-sdk is ready!!"),wx.startRecord({success:function(){wx.stopRecord()}})})},data:function(){return{loaded:!1,transitionName:"slide-left"}},watch:{$route:function(t,e){this.transitionName=i(t,e)}}};var s=[]},227:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(123),a=n.n(i),s=n(134),o=n.n(s),r=n(223),c=n(224);e.default={mounted:function(){this.drawChart()},components:{},data:function(){return{}},methods:{drawChart:function(){var t=this.$refs.chart;console.log(t);var e=o.a.init(t);console.log(e),e.setOption(this.getChartOpts())},getChartOpts:function(){var t=this,e={legend:["名称（计数）"],xAxis:["北京","武汉"],series:[{data:[22,101],name:"名称（计数）",type:"bar"}]};return{color:r.a.color,tooltip:{trigger:"axis",confine:r.a.confine,axisPointer:{type:"shadow"}},legend:a()({},r.a.lengend,{data:e.legend,textStyle:r.a.textStyle}),grid:r.a.grid,xAxis:[{type:"category",data:e.xAxis,axisLine:r.a.axisLine,axisLabel:a()({},r.a.axisLabel,{rotate:.93*this.$refs.chart.clientWidth>80*e.xAxis.length?0:45,formatter:function(n){var i=.06*t.$refs.chart.clientHeight/7;return n&&n.length>i&&.93*t.$refs.chart.clientWidth<80*e.xAxis.length?n.substr(0,i)+"...":n}})}],yAxis:[{type:"value",axisLine:r.a.axisLine,splitLine:r.a.splitLine,axisLabel:a()({},r.a.axisLabel,{formatter:function(t){return n.i(c.a)(t)}})}],series:e.series}}}}},228:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={mounted:function(){},components:{},data:function(){return{}},methods:{}}},229:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={mounted:function(){},components:{},data:function(){return{}},methods:{}}},230:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={mounted:function(){},components:{},data:function(){return{}},methods:{}}},231:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(537),a=n.n(i),s=n(535),o=n.n(s),r=n(536),c=n.n(r),u=n(538),l=n.n(u),d=n(134);n.n(d);e.default={mounted:function(){},components:{PieChart:a.a,ColumnChart:o.a,LineChart:c.a,RadarChart:l.a},data:function(){return{}},methods:{}}},232:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(122),a=0;e.default={mounted:function(){},data:function(){return{recording:!1,pending:!1}},computed:{primaryTip:function(){return this.pending&&!this.recording?"正在识别并查询...":this.recording?"正在接收语音...":"点击说出指令"},secondaryTip:function(){return this.pending&&!this.recording?"":this.recording?"点击停止说话":"通过语音查询数据报告"}},methods:{handleToggleRecord:function(){var t=this;this.recording?this.stopRecord():(wx.startRecord({cancel:function(){t.$vux.toast.show({type:"warn",text:"未授权录音"})}}),this.recording=!0,a=setTimeout(function(){t.stopRecord()},1e4))},stopRecord:function(){var t=this;clearTimeout(a),wx.stopRecord({success:function(e){var a=e.localId;t.pending=!0,wx.translateVoice({localId:a,isShowProgressTips:0,complete:function(e){e.hasOwnProperty("translateResult")?(console.log("识别结果："+e.translateResult),t.$vux.toast.show({type:"success",text:"识别结果："+e.translateResult}),n.i(i.b)({lang_texts:[e.translateResult]},function(e){t.pending=!1},function(e){t.pending=!1})):(t.pending=!1,t.$vux.toast.show({type:"warn",text:"无法识别"}))}})}}),this.recording=!1}}}},513:function(t,e){},514:function(t,e){},515:function(t,e){},516:function(t,e){},517:function(t,e){},518:function(t,e){},519:function(t,e){},520:function(t,e){},524:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{staticClass:"container"})},staticRenderFns:[]}},525:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{staticClass:"container"})},staticRenderFns:[]}},526:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"vux-toast"},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.isShowMask&&t.show,expression:"isShowMask && show"}],staticClass:"weui-mask_transparent"}),t._v(" "),n("transition",{attrs:{name:t.currentTransition}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],staticClass:"weui-toast",class:t.toastClass,style:{width:t.width}},[n("i",{directives:[{name:"show",rawName:"v-show",value:"text"!==t.type,expression:"type !== 'text'"}],staticClass:"weui-icon-success-no-circle weui-icon_toast"}),t._v(" "),t.text?n("p",{staticClass:"weui-toast__content",style:t.style,domProps:{innerHTML:t._s(t.text)}}):n("p",{staticClass:"weui-toast__content"},[t._t("default")],2)])])],1)},staticRenderFns:[]}},527:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{staticClass:"container"})},staticRenderFns:[]}},528:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container"},[n("div",{ref:"chart",staticClass:"chart-conatiner"})])},staticRenderFns:[]}},529:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("transition",{attrs:{name:t.transitionName}},[n("keep-alive",[t.loaded?n("router-view",{staticClass:"main-view slide-view"}):t._e()],1)],1)],1)},staticRenderFns:[]}},530:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container"},[n("div",{staticClass:"chart-area"},[n("ColumnChart")],1),t._v(" "),t._m(0)])},staticRenderFns:[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"bottom-area"},[n("div",{staticClass:"voice-btn"},[n("i",{staticClass:"dmpicon-mic"})])])}]}},531:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container"},[n("div",{staticClass:"btn-container",on:{touchend:t.handleToggleRecord}},[t._m(0),t._v(" "),!t.recording&&t.pending?n("div",{staticClass:"data-pending-ani"}):t._e(),t._v(" "),t.recording?n("div",[n("div",{staticClass:"wave-animate wave-animate-1"}),t._v(" "),n("div",{staticClass:"wave-animate wave-animate-2"}),t._v(" "),n("div",{staticClass:"wave-animate wave-animate-3"}),t._v(" "),n("div",{staticClass:"wave-animate wave-animate-4"})]):t._e()]),t._v(" "),n("div",{staticClass:"recording-status"},[n("div",{staticClass:"primary"},[t._v(t._s(t.primaryTip))]),t._v(" "),n("div",{staticClass:"secondary"},[t._v(t._s(t.secondaryTip))])])])},staticRenderFns:[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mic-icon"},[n("i",{staticClass:"dmpicon-mic"})])}]}},534:function(t,e,n){n(515);var i=n(30)(n(225),n(526),null,null);t.exports=i.exports},535:function(t,e,n){n(517);var i=n(30)(n(227),n(528),"data-v-3032c0b2",null);t.exports=i.exports},536:function(t,e,n){n(516);var i=n(30)(n(228),n(527),"data-v-300dbf50",null);t.exports=i.exports},537:function(t,e,n){n(513);var i=n(30)(n(229),n(524),"data-v-061b5ee0",null);t.exports=i.exports},538:function(t,e,n){n(514);var i=n(30)(n(230),n(525),"data-v-0ff1974c",null);t.exports=i.exports},539:function(t,e,n){n(519);var i=n(30)(n(231),n(530),"data-v-3ec64c34",null);t.exports=i.exports},540:function(t,e,n){n(520);var i=n(30)(n(232),n(531),"data-v-64728b6c",null);t.exports=i.exports}},[222]);
//# sourceMappingURL=app.e2ac636cbce9496001d2.js.map
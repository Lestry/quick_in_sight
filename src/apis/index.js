// require('es6-promise').polyfill();
// import fetch from 'isomorphic-fetch';

import axios from 'axios';


// 查询数据报告
const getChartData = (lang_text, succ, fail) => {

  axios.get(`https://dmp-dbeta.mypaas.com.cn/api/quick_insight/text?lang_text=${lang_text}&tenant_code=beta&t=${new Date().getTime()}`)
  .then(res => {
    typeof succ === 'function' && succ(res.data);
  })
  .catch(err => {
    console.log('Get chart data api failed: ', err);
    typeof fail === 'function' && fail(err);
  })
}

// 获取微信JSSDK签名
const getSignature = (succ, fail) => {
  axios.post('https://dmp-dbeta.mypaas.com.cn/api/quick_insight/signature?t=' + new Date().getTime())
  .then(res => {
    typeof succ === 'function' && succ(res.data);
  })
  .catch(err => {
    console.log('Get wexin signature failed: ', err);
    typeof fail === 'function' && fail(err);
  })
}

export {
  getChartData,
  getSignature
}
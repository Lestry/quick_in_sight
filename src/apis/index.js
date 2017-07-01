import axios from 'axios';

const A = axios.create({
  baseURL: 'https://dmp-dbeta.mypaas.com.cn/api/',
  timeout: 1000,
  headers: {
    'content-type': 'application/json'
  }
});

// 查询数据报告
const getChartData = (params, succ, fail) => {
  A({
    url: '/quick_insight/text?t=' + new Data().getTime(),
    method: 'POST',
    data: {
      ...params,
      tenant_code: 'beta',
    }
  }).then(res => {
    typeof succ === 'function' && succ(res.data);
  }).catch(err => {
    console.log('Get chart data api failed: ', err);
    typeof fail === 'function' && fail(err);
  })
}

// 获取微信JSSDK签名
const getSignature = (succ, fail) => {
  A({
    url: '/quick_insight/signature?t=' + new Data().getTime(),
    method: 'POST'
  }).then(res => {
    typeof succ === 'function' && succ(res.data);
  }).catch(err => {
    console.log('Get wexin signature failed: ', err);
    typeof fail === 'function' && fail(err);
  })
}

export {
  getChartData,
  getSignature
}
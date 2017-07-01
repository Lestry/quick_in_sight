import axios from 'axios';

const A = axios.create({
  baseURL: 'https://dmp-dbeta.mypaas.com.cn/api/',
  timeout: 1000,
  headers: {
    'content-type': 'application/json'
  }
});

// 查询数据报告
const getChartData = (params, json) => {
  A({
    url: '/quick_insight/text',
    method: 'POST',
    data: {
      ...params,
      tenant_code: 'beta'
    }
  }).then(res => {
    typeof json === 'function' && json(res.data);
  }).catch(err => {
    console.log('Get chart data api failed: ', err);
  })
}

// 获取微信JSSDK签名
const getSignature = (json) => {
  A({
    url: '/quick_insight/signature',
    method: 'POST'
  }).then(res => {
    typeof json === 'function' && json(res.data);
  }).catch(err => {
    console.log('Get wexin signature failed: ', err);
  })
}

export {
  getChartData,
  getSignature
}
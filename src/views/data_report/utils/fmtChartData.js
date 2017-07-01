import { RESERVE_OPTION_MAPS } from '../constants';
import fmtSeries from './fmtSeries';


// 对数据进行加工 
// -------- 改版后 -------------------
// 前端不再处理数据的准确. 
// 别名 匹配规则. ${formula_mode}_${col_name}

function dataProcess(indicators, data) {
  let dims = {};
  let nums = {};

  indicators.dims.forEach(item => {
    const field = !!item.formula_mode ? `${item.formula_mode}_${item.col_name}` : item.col_name;
    const alias = item.alias || item.alias_name || item.col_name;
    const key = RESERVE_OPTION_MAPS[item.formula_mode] ? `${alias}（${RESERVE_OPTION_MAPS[item.formula_mode]}）` : alias;
    const value = data.map(_data => _data[field]);

    dims = {...dims, [key]: value}
  })
  // 数值类型 有3种 操作. 
  // formula_mode - count - 计数
  // formula_mode - 'avg': '平均值',
  // formula_mode - 'sum': '求和', 
  indicators.nums.forEach(item => {
    const field = !!item.formula_mode ? `${item.formula_mode}_${item.col_name}` : item.col_name;
    const alias =  item.alias || item.alias_name || item.col_name;
    const key = RESERVE_OPTION_MAPS[item.formula_mode] ? `${alias}(${RESERVE_OPTION_MAPS[item.formula_mode]})` : alias;
    const value = data.map(_data => _data[field]);

    nums = {...nums, [key]: value};
  })

  return {dims, nums}
}

// 对 data 数据 null -> '-'
function filter(data) {
  return data.map(item => {
    Object.getOwnPropertyNames(item).map(key => {
      if (item[key] == null) {
        item[key] = '-'
      }
    })
    return item;
  })
}

export default function fmtChartData(type, indicators, data) {  

  data = filter(data);

  let { dims, nums } = dataProcess(indicators, data);

  let chart_data;

  switch (type) {
    case 'pie' : {
      // 1个维度， 1个数值
      // 0 维度， 多数值
      const __data = []
      const _dims = Object.entries(dims)
      const _nums = Object.entries(nums)
      if (_dims.length > 0) {
        _dims[0][1].forEach((item,i) => {
          __data.push({name: item, value: +_nums[0][1][i]})
        })
      } else {
        _nums.forEach(item => {
          __data.push({name: item[0], value: item[1][0]})
        })
      }
      chart_data = __data
    }; break;
    case 'numerical_value': {
      let name = ''
      let value = 0
      Object.keys(nums).forEach(num => {
        name = num
        value = nums[num]
      })
      chart_data = {name,value}
    }; break;
    default: 
      chart_data = {dims, nums};

  }

  return chart_data
} 
// fmt
function fmtInteger(ints) {
  const arr = ints.split("").reverse()
  const newArr = []

  arr.forEach((item,i) => {
    if ( i % 3 == 2 && i !== (arr.length - 1)) {
      newArr.push(item)
      newArr.push(",")
    } else {
      newArr.push(item)
    }
  })

  return newArr.reverse().join("")
}

// 转换 数字 成 1,222
export default function fmtNumber(value) {
  if (+value >= 0) {
    let int = fmtInteger(value.toString())
    let point = ""
    let decimal = ""
    //  如果存在 类似 12.0000 之类. 
    if (!(Number.isSafeInteger(+value) && value.toString().indexOf('.') === -1)) {
      value = Number(value).toFixed(2)
      const ints = value.toString().split('.')

      int = fmtInteger(ints[0])
      point = "."
      decimal = ints[1]
    }

    return `${int}${point}${decimal}`
  } else {
    return '-'
  }

}
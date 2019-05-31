import './common'
import '../style/common'
import '../style/index'
const textFun = (text1, text0) => {
  let result = `${text1} ++ ${text0}`
  var obj = Object.assign({}, { result })
  let P = document.createElement('p')
  P.innerHTML = [1, 2].join(' ')
  var arr = Array.from(new Set([1, 2, 3, 2]))
  var promise = new Promise((resolve, reject) => {
    if (
      arr.findIndex(n => {
        return n > 1
      })
    ) {
      resolve(obj)
    }
  })
  promise.then(res => {
    console.log('babel转转一些特殊的语法：Promise/Object.assign/Array.from', res)
  })
  return obj
}
textFun('text1', 'text0')

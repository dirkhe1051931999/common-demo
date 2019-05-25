// 实现一个createArray
// 没有准确的定义返回值的类型,预期数组中的每一项的类型与输入的value的类型一致
function createArray(length: number, value: any): Array<any> {
  let result = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
}
createArray(3, 'x');

// 意味着，createArray的成员类型必须与value类型一致，提前定义好成员类型，如果value与提前定义好的类型不一致，就报错
function createArray<T>(length: number, value: T): Array<T> {
  let result: T[] = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
}
createArray<String>(3, 'x');

// 使用泛型接口来定义函数
interface CreateFn {
  <T>(length: number, value: T): Array<T>;
}
let createFn: CreateFn = function<T>(length: number, value: T): Array<T> {
  let result: T[] = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
};
createFn(3, 'x');

interface CreateFn2<T> {
  (length: number, value: T): Array<T>;
}
let createFn2: CreateFn2<number> = function<T>(length: number, value: T): Array<T> {
  let result: T[] = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
};
createFn2(3, 1);

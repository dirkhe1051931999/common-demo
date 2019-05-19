// 用接口表示数组
interface ArrayInterface {
  [prop: number]: number;
}
let arr: ArrayInterface = [1, 2, 3, 4, 5, 6];

interface ArrayInterface2 {
  [prop: string]: any;
}
let arr2: ArrayInterface2 = [false, null, 1, 'a'];

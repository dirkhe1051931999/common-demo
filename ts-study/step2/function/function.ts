// 定义一个函数类型
// 输出是number
function sum(x: number, y: number): number {
  return x + y;
}
sum(1, 2);
// 输出是any
var sum2 = function(x: string, y: any): any {
  var result = x + y;
  console.log(result);
};
sum2('boolean', false);
// 推导出一个函数类型
var sum3: (x: number, y: number) => number = function(x: number, y: number): number {
  return x + y;
};
// 形参可选:可选参数后面不允许再出现必选参数
function sum4(x: number, y: number, z?: number): number {
  if (z) {
    return x + y + z;
  } else {
    return x + y;
  }
}
sum4(1, 2, 3);
sum4(1, 2);
// 参数默认值
function sum5(x?: string = 'hello', y: string): string {
  return x + y;
}
sum5(undefined, 'world');

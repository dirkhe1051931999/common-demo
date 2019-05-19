// 用接口定一个函数
interface Func {
  (x: number, y: number): boolean;
}
let func: Func = function(x, y) {
  return false;
};
func(1, 2);

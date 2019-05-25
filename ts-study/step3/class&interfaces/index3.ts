// 混合类型
// 接口来定义函数的形状
interface Couter {
  (start: number): string;
  interval: number;
  reset(): void;
}
function getCouter(): Couter {
  let couter = <Couter>function(strat: number) {};
  couter.interval = 1000;
  couter.reset = function() {};
  return couter;
}
let g = getCouter();
g(10);
g.reset();
g.interval = 2000;

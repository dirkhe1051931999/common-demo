// 引入Zepto库，需要重新定义$（Zepto）
declare var Zepto: (selector: string) => any;
// 引入jQuery库，需要重新定义$（jQuery）
declare function jQuery(selector: string): any;
// 重新定义类
declare class Animal {
  name: string;
  constructor(name: string);
  sayHi(): string;
}
// export的用法
declare const name: string;
declare function getName(): string;
declare enum Directions {
  Up,
  Down,
  Left,
  Right
}
interface Options {
  data: any;
}
export { name, getName, Animal, Directions, Options };
// export default 的用法
declare function foo(): string;
export default foo;



Zepto('#id');
jQuery('.class');
new Animal('Tom');

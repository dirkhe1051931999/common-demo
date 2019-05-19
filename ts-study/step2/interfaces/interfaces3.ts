// 不用完全匹配一个形状，可以用可选属性，但是不能添加未定义属性
interface Person {
  name: string;
  age?: number;
}
let tom: Person = {
  name: 'tom'
};

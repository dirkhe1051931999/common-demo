// 约束了对象的形状必须和Person一致，比接口少了一些属性是不允许的，反之多了也不允许
// 赋值的时候，变量的形状必须和接口的形状保持一致
interface Person {
  name: string;
  age: number;
}

let tom: Person = {
  name: 'Tom'
};

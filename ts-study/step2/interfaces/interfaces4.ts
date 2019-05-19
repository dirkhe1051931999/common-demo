// 接口允许任意属性
interface Person {
  name: string;
  age?: number;
  [prop: string]: any;
}
let person: Person = {
  name: 'tom',
  listen: function() {}
};

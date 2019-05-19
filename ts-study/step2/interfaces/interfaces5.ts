// 接口允许任意属性，确定属性和可选属性的类型必须都是任意属性的子级
interface Person {
  name: string;
  age?: number;
  [prop: string]: string;
}
let person: Person = {
  name: 'tom',
  listen: function() {}
};

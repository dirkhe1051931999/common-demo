// 只读属性，只读属性在对象赋值的就要传入，其他地方传入会报错
interface Person {
  readonly id: number;
  name: string;
  age?: number;
  [prop: string]: any;
}
let person: Person = {
  id: 1,
  name: 'tim',
  age: 18,
  say() {}
};
// 只读属性赋值会报错
person.id = 2;

// 泛型约束
// 在函数内部使用泛型的时候，事先不知道它是哪种类型，所以不能随意操作它的属性与方法
// 报错
// function login<T>(name: T): T {
//   console.log(name.length);
//   return name;
// }
// 进行泛型约束：只允许传入有length属性的变量
interface Lenghtwise {
  length: number;
}
function login2<T extends Lenghtwise>(name: T): T {
  console.log(name.length);
  return name;
}
// 报错：因为1没有长度
// login2(1);
// 不报错
login2('hello');

// 多个类型参数之前也可以互相约束
// T继承于U，保证了U上不会出现T中不存在的字段
function copy<T extends U, U>(target: T, source: U): T {
  for (let key in source) {
    target[key] = (<T>source)[key];
  }
  return target;
}
let x = { a: 1, b: 2 };
// 报错
// copy(x, { a: 10, b: '20' });
// 不报错
copy(x, { a: 10, b: 20 });

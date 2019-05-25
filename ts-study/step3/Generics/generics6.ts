// 泛型类，泛型用户类的类型定义
// 泛型参数可以选择默认值
class Class1<T = string> {
  get: T;
  add: (x: T, Y: T) => T;
}
let class1 = new Class1();
class1.get = 0 + '';
class1.add = (x, y) => x + y;

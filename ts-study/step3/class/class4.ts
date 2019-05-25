// abstract 用于定义抽象类和其中的抽象方法。
// 首先，抽象类是不允许被实例化的：
abstract class Animal {
  public name: string;
  public constructor(name: string) {
    this.name = name;
  }
}

class Person extends Animal {
  public constructor(name: string) {
    super(name);
  }
  getName(): string {
    console.log(this.name);
    return this.name
  }
}
// 报错
// let a = new Animal()
// 不报错
let p = new Person('dog');
console.log(p.name);

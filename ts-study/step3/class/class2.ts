// 设置一个私有属性
class Animal {
  private name;
  public constructor(name) {
    this.name = name;
  }
}
let a = new Animal('dog');
// 报错
a.name = 'cat';

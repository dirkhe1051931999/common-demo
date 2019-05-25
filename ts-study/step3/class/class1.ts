// TypeScript 可以使用三种访问修饰符（Access Modifiers），分别是 public、private 和 protected
class Animal {
  public name;
  public constructor(name) {
    this.name = name;
  }
}
let a = new Animal('dog');
a.name = 'cat';

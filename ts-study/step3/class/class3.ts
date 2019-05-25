// private子类不可访问，protected子类可以访问
class Animal {
  private name;
  protected age;
  public constructor(name) {
    this.name = name;
  }
}
class Person extends Animal {
  public constructor(name) {
    super(name);
  }
  public getAge() {
    console.log(this.age);
  }
  // 报错
  public getName() {
    console.log(this.name);
  }
}

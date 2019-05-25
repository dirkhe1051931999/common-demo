// TypeScript 可以使用三种访问修饰符（Access Modifiers），分别是 public、private 和 protected
var Animal = /** @class */ (function () {
    function Animal(name) {
        this.name = name;
    }
    return Animal;
}());
var a = new Animal('dog');
a.name = 'cat';

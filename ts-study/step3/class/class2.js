// 设置一个私有属性
var Animal = /** @class */ (function () {
    function Animal(name) {
        this.name = name;
    }
    return Animal;
}());
var a = new Animal('dog');
// 报错
a.name = 'cat';

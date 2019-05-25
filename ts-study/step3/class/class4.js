var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// abstract 用于定义抽象类和其中的抽象方法。
// 首先，抽象类是不允许被实例化的：
var Animal = /** @class */ (function () {
    function Animal(name) {
        this.name = name;
    }
    return Animal;
}());
var Person = /** @class */ (function (_super) {
    __extends(Person, _super);
    function Person(name) {
        return _super.call(this, name) || this;
    }
    Person.prototype.getName = function () {
        console.log(this.name);
        return this.name;
    };
    return Person;
}(Animal));
// 报错
// let a = new Animal()
// 不报错
var p = new Person('dog');
console.log(p.name);

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
var Door = /** @class */ (function () {
    function Door() {
    }
    return Door;
}());
// 防盗门
var SecurityDoor = /** @class */ (function (_super) {
    __extends(SecurityDoor, _super);
    function SecurityDoor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SecurityDoor.prototype.alert = function () {
        console.log('防盗门报警');
    };
    SecurityDoor.prototype.lightOn = function () {
        console.log('防盗门选择开灯');
    };
    SecurityDoor.prototype.lightOff = function () {
        console.log('防盗门选择关灯');
    };
    return SecurityDoor;
}(Door));
var Car = /** @class */ (function () {
    function Car() {
    }
    return Car;
}());
// 小卡车
var SmallCar = /** @class */ (function (_super) {
    __extends(SmallCar, _super);
    function SmallCar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SmallCar.prototype.alert = function () {
        console.log('小卡车报警');
    };
    SmallCar.prototype.lightOff = function () {
        console.log('小卡车选择关灯');
    };
    SmallCar.prototype.lightOn = function () {
        console.log('小卡车选择开灯');
    };
    return SmallCar;
}(Car));
// 大卡车
var BigCar = /** @class */ (function (_super) {
    __extends(BigCar, _super);
    function BigCar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BigCar.prototype.alert = function () { };
    BigCar.prototype.boast = function () { };
    return BigCar;
}(Car));

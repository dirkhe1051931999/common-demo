// 定义一个函数类型
// 输出是number
function sum(x, y) {
    return x + y;
}
sum(1, 2);
// 输出是any
var sum2 = function (x, y) {
    var result = x + y;
    console.log(result);
};
sum2('boolean', false);
// 推导出一个函数类型
var sum3 = function (x, y) {
    return x + y;
};
// 形参可选:可选参数后面不允许再出现必选参数
function sum4(x, y, z) {
    if (z) {
        return x + y + z;
    }
    else {
        return x + y;
    }
}
sum4(1, 2, 3);
sum4(1, 2);
// 参数默认值：有了默认值就可选参数后面可以是必须参数
function sum5(x, y) {
    if (x === void 0) { x = 'hello'; }
    return x + y;
}
sum5('world');

// 枚举项有两种类型：常数项（constant member）和计算所得项（computed member）。
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Blue"] = 'blue'.length] = "Blue";
})(Color || (Color = {}));
// 如果紧接在计算所得项后面的是未手动赋值的项，那么就会因为无法获取初始化而报错
// 报错
// enum Color2 {
//   Blue = 'blue'.length,
//   Red
// }
// 不报错
var Color3;
(function (Color3) {
    Color3[Color3["Blue"] = 'blue'.length] = "Blue";
    Color3[Color3["Red"] = 1.5] = "Red";
})(Color3 || (Color3 = {}));

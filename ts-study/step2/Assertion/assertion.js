// 一个函数，输入类型是联合类型，但是不确定输入是什么类型，进行类型断言，如果不断言就会访问联合类型的共有属性与方法
// 断言成一个联合类型中不存在的类型是不允许的
function sum(x) {
    if (x.length) {
        return x.length;
    } else {
        return x.toString().length;
    }
}
sum(1);
sum('1');
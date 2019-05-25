function login2(name) {
    console.log(name.length);
    return name;
}
// 报错：因为1没有长度
// login2(1);
// 不报错
login2('hello');
// 多个类型参数之前也可以互相约束
// T继承于U，保证了U上不会出现T中不存在的字段
function copy(target, source) {
    for (var key in source) {
        target[key] = source[key];
    }
    return target;
}
var x = { a: 1, b: 2 };
// 报错
// copy(x, { a: 10, b: '20' });
// 不报错
copy(x, { a: 10, b: 20 });

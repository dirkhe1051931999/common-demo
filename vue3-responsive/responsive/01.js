// proxy的对象代理拦截实现数据响应式函数
// 缺点： 1、每次调用responsive方法，都会重新new Proxy（预期会使用缓存的）2、没办法缓存Proxy实例

var func = {
  get(target, key, receiver) {
    return Reflect.get(target, key, receiver);
  },
  set(target, key, val, receiver) {
    return Reflect.set(target, key, val, receiver);
  }
};
var responsive = function(target) {
  return new Proxy(target, func);
};
var person = {
  name: "he",
  weight: 74
};
var r1 = responsive(person);
r1 = responsive(person);
r1 = responsive(r1);
console.log(r1.weight); // 74
r1.weight = 75;
console.log(r1.weight); // 75

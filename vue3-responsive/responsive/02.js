// proxy的对象拦截实现响应式数据函数
// 避免重复实例Proxy和缓存observed实例
var func = {
  get(target, key, receiver) {
    return Reflect.get(target, key, receiver);
  },
  set(target, key, val, receiver) {
    return Reflect.set(target, key, val, receiver);
  }
};
var wm1 = new WeakMap();
var wm2 = new WeakMap();
var responsive = function(target) {
  // 是否有observed
  var observed = wm1.get(target);
  // 是否有target
  var value = wm2.has(target);
  if (observed) {
    return observed;
  }
  if (value) {
    return target;
  }
  observed = new Proxy(target, func);
  // 缓存observed
  wm1.set(target, observed);
  // 缓存target
  wm2.set(observed, target);
  return observed;
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

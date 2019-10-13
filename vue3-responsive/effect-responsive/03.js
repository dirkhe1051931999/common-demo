// 依赖收集
// 依赖收集的最终数据结构
// targetMap = {
//   target: {
//     name: [effect]，
//     age: [effect]
//   }
// }
var targetMap = new WeakMap();
function track(target, key) {
  var effect = activeEffectStack(activeEffectStack.length - 1);
  if (effect) {
    var depsMap = targetMap.get(target);
    if (depsMap === void 0) {
      depsMap = new Map();
      targetMap.set(target, depsMap);
    }
    var dep = depsMap.get(key);
    if (dep === void 0) {
      dep = new Set();
      depsMap.set(key, dep);
    }
    if (!dep.has(effect)) {
      dep.add(effect);
      effect.deps.push(dep);
    }
  }
}

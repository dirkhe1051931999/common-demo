// 派发更新
function trigger(target, key, extra) {
  var depsMap = targetMap.get(target);
  if (depsMap === void 0 || key === void 0) {
    return;
  }
  var effects = new Set();
  var computedEffects = new Set();
  let deps = depsMap.get(key);
  deps.forEach(effect => {
    if (effect.computed) {
      computedEffects.add(effect);
    } else {
      effects.add(effect);
    }
  });
  computedEffects.forEach(effect => {
    effect();
  });
  effects.forEach(effect => {
    effect();
  });
}

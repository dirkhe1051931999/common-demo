// effect的实现
function effect(fn, options = {}) {
  var effect = createResponsiveEffect(fn, options);
  return options.lazy ? effect : effect();
}
function createResponsiveEffect(fn, options) {
  var effect = function(...args) {
    return run(effect, fn, args);
  };
  effect.lazy = options.lazy;
  effect.computed = options.computed;
  effect.deps = [];
  return effect;
}

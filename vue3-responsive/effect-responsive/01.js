// run的实现
var activeEffectStack = [];
function run(effect, fn, args) {
  if (activeEffectStack.indexOf(effect) === -1) {
    try {
      // 把effectpush到数组里面
      activeEffectStack.push(effect);
      return fn(...args);
    } finally {
      // 清除已经收集到的effect
      activeEffectStack.pop();
    }
  }
}

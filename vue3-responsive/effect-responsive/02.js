// 触发依赖收集与派发更新
var isObject = object => (object && typeof object === "object" ? true : false);
var func = {
  get(target, key, receiver) {
    var result = Reflect.get(target, key, receiver);
    // 依赖收集
    track(target, key);
    return isObject(result) ? responsive(result) : result;
  },
  set(target, key, val, receiver) {
    var result = Reflect.set(target, key, val, receiver);
    const extra = { oldValue: target[key], newValue: target };
    // 派发更新
    trigger(target, key, extra);
    return result;
  }
};

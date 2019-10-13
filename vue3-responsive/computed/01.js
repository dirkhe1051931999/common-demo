// computed的实现

function computed(fn) {
  var getter = fn;
  var func = effect(getter, { computed: true, lazy: true });

  return {
    effect: func,
    get value() {
      return func();
    }
  };
}

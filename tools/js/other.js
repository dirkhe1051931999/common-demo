class OtherFn {
  /**
   * 浅拷贝
   * @param {Object} obj
   * shallowClone({a: 1,arr: [1, 2]})
   */
  shallowClone(obj) {
    var dst = {};
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        dst[prop] = obj[prop];
      }
    }
    return dst;
  }
  /**
   * 深拷贝
   * @param {Object} obj
   * deepClone({a: 1,arr: [1, 2]})
   */
  deepClone(obj) {
    var c = c || {};
    for (var i in obj) {
      if (typeof obj[i] === "object") {
        if (obj[i].constructor === Array) {
          c[i] = [];
        } else {
          c[i] = {};
        }
        this.deepClone(obj[i], c[i]);
      } else {
        c[i] = obj[i];
      }
    }
    return c;
  }
  /**
   * 防抖动
   * @param {Function} fn  执行的函数
   * @param {Number} delay 多少秒之后执
   * @param {Boolean} immediate 是否立即执行
   */
  debounce(fn, delay, immediate) {
    var timeout;
    return function() {
      var context = this,
        args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) fn.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, delay);
      if (callNow) fn.apply(context, args);
    };
  }
  /**
   * 节流
   * @param {Function} func 执行的函数
   * @param {Number} delay 多少秒之内执行一次
   */
  throttle(func, delay) {
    var prev = Date.now();
    return function() {
      var context = this;
      var args = arguments;
      var now = Date.now();
      if (now - prev >= delay) {
        func.apply(context, args);
        prev = Date.now();
      }
    };
  }
  /**
   * 获取全部url参数,并转换成json对象
   * @param {String} url
   * getUrlAllParams('https://www.google.com/search?newwindow=1&safe=strict'))->{newwindow: "1", safe: "strict"}
   */
  getUrlAllParams(url) {
    var url = url ? url : window.location.href;
    var _pa = url.substring(url.indexOf("?") + 1),
      _arrS = _pa.split("&"),
      _rs = {};
    for (var i = 0, _len = _arrS.length; i < _len; i++) {
      var pos = _arrS[i].indexOf("=");
      if (pos == -1) {
        continue;
      }
      var name = _arrS[i].substring(0, pos),
        value = window.decodeURIComponent(_arrS[i].substring(pos + 1));
      _rs[name] = value;
    }
    return _rs;
  }
  // 搜索框节流
  debounce(cb, delay = 100) {
    var time;
    return function(...args) {
      timer && clearTimeout(timer);
      timer = setTimeout(() => {
        cb.apply(this, args);
      }, delay);
    };
  }
  // 函数柯里化
  currySum(...args) {
    var res = args.reduce((a, b) => a + b);
    return function(...nextArgs) {
      if (nextArgs.length === 0) return res;
      return currySum(res, ...nextArgs);
    };
  }
}

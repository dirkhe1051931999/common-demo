class ArrayFn {
  /**
   * 判断一个元素是否在数组
   * contains([1,2,3],1) -> true
   * @param {Array} arr 数组
   * @param {*} val 元素
   */
  contains(arr, val) {
    return arr.indexOf(val) != -1 ? true : false;
  }
  /**
   * 私有方法
   * @param {Array} arr  数组
   * @param {Function} fn  回调函数
   */
  each(arr, fn) {
    fn = fn || Function;
    var a = [];
    var args = Array.prototype.slice.call(arguments, 1);
    for (var i = 0; i < arr.length; i++) {
      var res = fn.apply(arr, [arr[i], i].concat(args));
      if (res != null) a.push(res);
    }
  }
  /**
   * 私有方法
   * @param {Array} arr 数组
   * @param {Function} fn 回调函数
   * @param {Object} thisObj this指向
   */
  map(arr, fn, thisObj) {
    var scope = thisObj || window;
    var a = [];
    for (var i = 0, j = arr.length; i < j; ++i) {
      var res = fn.call(scope, arr[i], i, this);
      if (res != null) a.push(res);
    }
    return a;
  }
  /**
   * 排序
   * sort([1,2,3],2))-> [3,2,1]
   * @param {Array} arr 数组
   * @param {Number} type 排序方式
   */
  sort(arr, type = 1) {
    return arr.sort((a, b) => {
      switch (type) {
        case 1:
          return a - b;
        case 2:
          return b - a;
        case 3:
          return Math.random() - 0.5;
        default:
          return arr;
      }
    });
  }
  /**
   * 数组去重，但不能区分 2 和 '2'
   * unique([1,2,3,1,2,4,'4']))->[1, 2, 3, 4, "4"]
   * @param {Array} arr 数组
   */
  unique(arr) {
    if (Array.hasOwnProperty("from")) {
      return Array.from(new Set(arr));
    } else {
      var n = {},
        r = [];
      for (var i = 0; i < arr.length; i++) {
        if (!n[arr[i]]) {
          n[arr[i]] = true;
          r.push(arr[i]);
        }
      }
      return r;
    }
  }
  /**
   * 求两个数组的并集，依赖unique方法
   * union([1,2,3],[1,2,3,4]))->[1,2,3,4]
   * @param {Array} a 数组
   * @param {Array} b 数组
   */
  union(a, b) {
    var newArr = a.concat(b);
    return this.unique(newArr);
  }
  /**
   * 求两个数组和合集，依赖unique、map、contains方法
   * union([1,2,3],[1,2,3,4]))->[1,2,3]
   * @param {Array} a
   * @param {Array} b
   */
  intersect(a, b) {
    var _this = this;
    a = this.unique(a);
    return this.map(a, function(o) {
      return _this.contains(b, o) ? o : null;
    });
  }
  /**
   * 删除数组的一个元素
   * remove([1,2,3],1))->[2,3]
   * @param {Array} arr 数组
   * @param {*} ele 元素
   */
  remove(arr, ele) {
    var index = arr.indexOf(ele);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }
  /**
   * 将类数组转换为数组的方法
   * formArray({'0':42,'1':52,'2':63,length:3}))->[42, 52, 63]
   * @param {Object} ary 类数组
   */
  formArray(ary) {
    var arr = [];
    if (Array.isArray(ary)) {
      arr = ary;
    } else {
      arr = Array.prototype.slice.call(ary);
    }
    return arr;
  }
  /**
   * 数组的最大值
   * max([1,2,3])->3
   * @param {Array} arr
   */
  max(arr) {
    return Math.max.apply(null, arr);
  }

  /**
   * 数组的最小值
   * min([1,2,3])->1
   * @param {Array} arr
   */
  min(arr) {
    return Math.min.apply(null, arr);
  }

  /**
   * 数组的求和
   * sum([1,2,3])->6
   * @param {Array} arr
   */
  sum(arr) {
    return arr.reduce((pre, cur) => {
      return pre + cur;
    });
  }

  /**
   * 数组的平均值
   * sum([1,2,3])->2
   * @param {Array} arr
   */
  average(arr) {
    return this.sum(arr) / arr.length;
  }
  /**
   * 将数组块划分为指定大小的较小数组
   * chunk([1,2,3,4,5], 2) -> [[1,2],[3,4],[5]]
   * @param {Array} arr 数组
   * @param {Number} size 指定大小
   */
  chunk(arr, size) {
    return Array.from(
      {
        length: Math.ceil(arr.length / size)
      },
      (v, i) => arr.slice(i * size, i * size + size)
    );
  }
  /**
   * 从数组中移除 falsey 值
   * compact([0, 1, false, 2, '', 3, 'a', 'e'*23, NaN, 's', 34]) -> [ 1, 2, 3, 'a', 's', 34 ]
   * @param {Array} arr 数组
   */
  compact(arr) {
    return arr.filter(Boolean);
  }
  /**
   * 计算数组中值的出现次数
   * countOccurrences([1,1,2,1,2,3], 1) -> 3
   * @param {Array} arr 数组
   * @param {*} value 值
   */
  countOccurrences(arr, value) {
    return arr.reduce((a, v) => (v === value ? a + 1 : a + 0), 0);
  }
  /**
   * 深拼合数组
   * deepFlatten([1,[2],[[3],4],5]) -> [1,2,3,4,5]
   * @param {Array} arr
   */
  deepFlatten(arr) {
    return [].concat(...arr.map((v) => (Array.isArray(v) ? this.deepFlatten(v) : v)));
  }
  /**
   * 返回两个数组中存在的元素的列表
   * intersection([1,2,3], [4,3,2]) -> [2,3]
   * @param {Array} a 数组
   * @param {Array} b 数组
   */
  intersection(a, b) {
    const s = new Set(b);
    return a.filter((x) => s.has(x));
  }
  /**
   * 使用函数将数组的值映射到对象, 其中键值对由原始值作为键和映射值组成
   * const squareIt = arr => mapObject(arr, a => a*a)
   * squareIt([1,2,3]) // { 1: 1, 2: 4, 3: 9 }
   * @param {Array} arr  数组
   * @param {Function} f 操作方法
   */
  mapObject(arr, f) {
    return ((a) => ((a = [arr, arr.map(fn)]), a[0].reduce((acc, val, ind) => ((acc[val] = a[1][ind]), acc), {})))();
  }
  /**
   * 从对象中选取对应于给定键的键值对
   * pick({ 'a': 1, 'b': '2', 'c': 3 }, ['a', 'c']) -> { 'a': 1, 'c': 3 }
   * @param {Object} obj 对象
   * @param {Array} arr 数组
   */
  pick(obj, arr) {
    return arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {});
  }
  /**
   * 返回数组中的随机元素
   * sample([3, 7, 9, 11]) -> 9
   * @param {Array} arr
   */
  sample(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  /**
   * 将数组转换成对象，并将数组对象的id作为新对象的key，并根据Key排序
   * @param {Array} arr 数组
   * @param {Boolean} isSort 是否排序 选填
   * @param {String} sortName 排序的关键字 选填
   * @param {Number} sortType 升降序，1是升序，-1是降序
   * spreadArray(list, true, 'id', -1);
   */
  spreadArray(arr, isSort, sortName, sortType) {
    if (isSort && sortName && sortType) {
      // 默认是升序
      let sortBy = function(propery, type) {
        type = type ? type : 1;
        let fn = function(obj1, obj2) {
          if (obj1[propery] > obj2[propery]) {
            return 1 * type;
          } else if (obj1[propery] === obj2[propery]) {
            return 0 * type;
          } else {
            return -1 * type;
          }
        };
        return fn;
      };
      arr = arr.sort(sortBy(sortName, sortType));
    }
    // reduce的第二个参数初始了回调函数第一个参数的类型和值
    // 因为chrome自己会对key升序，所以加一个'*',最后显示的时候记着split掉就行
    let res = arr.reduce(function(res, cur) {
      return Object.assign({ ...res }, { [cur[sortName] + "*"]: cur });
    }, {});
    return res;
  }
  /**
   * 获取min到max之间的整数
   * @param {Number} min
   * @param {Number} max
   * getRandomInt(1,10)
   */
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  /**
   * 随机数组元素
   * @param {Array} arr
   * shuffle(arr)
   */
  shuffle(arr) {
    arr = arr.slice();
    for (let i = 0; i < arr.length; i++) {
      let j = getRandomInt(0, i);
      let t = arr[i];
      arr[i] = arr[j];
      arr[j] = t;
    }
    return arr;
  }
  /**
   * 不覆盖合并对象
   * @param {Object} foo
   * @param {Object} bar
   */
  deepmerge(foo, bar) {
    var merged = {};
    for (var each in bar) {
      if (foo.hasOwnProperty(each) && bar.hasOwnProperty(each)) {
        if (typeof foo[each] == "object" && typeof bar[each] == "object") {
          merged[each] = deepmerge(foo[each], bar[each]);
        } else {
          merged[each] = [foo[each], bar[each]];
        }
      } else if (bar.hasOwnProperty(each)) {
        merged[each] = bar[each];
      }
    }
    for (var each in foo) {
      if (!(each in bar) && foo.hasOwnProperty(each)) {
        merged[each] = foo[each];
      }
    }
    return merged;
  }
  /**
   * 展平数组
   * @param {*} arr
   */
  flatten(arr) {
    return [].concat(...arr);
  }
  /**
   * 展平嵌套数组
   * @param {*} arr
   */
  deepFlatten(arr) {
    flatten = (arr) => [].concat(...arr);
    return flatten(arr.map((x) => (Array.isArray(x) ? deepFlatten(x) : x)));
  }
}

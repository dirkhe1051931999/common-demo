class TypeFn {
  /**
   * 是否字符串
   * @param {*} o 
   */
  isString(o) {
    return Object.prototype.toString.call(o).slice(8, -1) === 'String'
  }
  /**
   * 是否数字
   * @param {*} o 
   */
  isNumber(o) {
    return Object.prototype.toString.call(o).slice(8, -1) === 'Number'
  }
  /**
   * 是否boolean
   * @param {*} o 
   */
  isBoolean(o) {
    return Object.prototype.toString.call(o).slice(8, -1) === 'Boolean'
  }
  /**
   * 是否函数
   * @param {*} o 
   */
  isFunction(o) {
    return Object.prototype.toString.call(o).slice(8, -1) === 'Function'
  }
  /**
   * 是否为null
   * @param {*} o 
   */
  isNull(o) {
    return Object.prototype.toString.call(o).slice(8, -1) === 'Null'
  }
  /**
   * 是否undefined
   * @param {*} o 
   */
  isUndefined(o) {
    return Object.prototype.toString.call(o).slice(8, -1) === 'Undefined'
  }
  /**
   * 是否对象
   * @param {*} o 
   */
  isObj(o) {
    return Object.prototype.toString.call(o).slice(8, -1) === 'Object'
  }
  /**
   * 是否数组
   * @param {*} o 
   */
  isArray(o) {
    return Object.prototype.toString.call(o).slice(8, -1) === 'Array'
  }
  /**
   * 是否时间
   * @param {*} o 
   */
  isDate(o) {
    return Object.prototype.toString.call(o).slice(8, -1) === 'Date'
  }
  /**
   * 是否正则
   * @param {*} o 
   */
  isRegExp(o) {
    return Object.prototype.toString.call(o).slice(8, -1) === 'RegExp'
  }
  /**
   * 是否错误对象
   * @param {*} o 
   */
  isError(o) {
    return Object.prototype.toString.call(o).slice(8, -1) === 'Error'
  }
  /**
   * 是否Symbol函数
   * @param {*} o 
   */
  isSymbol(o) {
    return Object.prototype.toString.call(o).slice(8, -1) === 'Symbol'
  }
  /**
   * 是否Promise对象
   * @param {*} o 
   */
  isPromise(o) {
    return Object.prototype.toString.call(o).slice(8, -1) === 'Promise'
  }
  /**
   * 是否Set对象
   * @param {*} o 
   */
  isSet(o) {
    return Object.prototype.toString.call(o).slice(8, -1) === 'Set'
  }

  /**
   * 是否字为falsey
   * @param {*} o 
   */
  isFalse(o) {
    if (o == '' || o == undefined || o == null || o == 'null' || o == 'undefined' || o == false || o == NaN) return true
    return false
  }
  /**
   * 是否true
   * @param {*} o 
   */
  isTrue(o) {
    return !this.isFalse(o)
  }
}
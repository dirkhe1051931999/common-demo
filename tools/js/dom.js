class DomFn {
  // <div>
  //   <p>koa</p>
  //   <p>node</p>
  //   <p class="test initial" data-name="hello world" style="color:red">test initial</p>
  // </div>
  /**
   * dom选择器
   * @param {String} selector 字符串
   * $(".test")-> HTMLCollection [p.test.initial]
   */
  $(selector) {
    var type = selector.substring(0, 1);
    if (type === '#') {
      if (document.querySelecotor) return document.querySelector(selector)
      return document.getElementById(selector.substring(1))

    } else if (type === '.') {
      if (document.querySelecotorAll) return document.querySelectorAll(selector)
      return document.getElementsByClassName(selector.substring(1))
    } else {
      return document['querySelectorAll' ? 'querySelectorAll' : 'getElementsByTagName'](selector)
    }
  }
  /**
   * 检测类名
   * @param {Object} ele dom
   * @param {String} name 名字
   */
  hasClass(ele, name) {
    return ele.className.match(new RegExp('(\\s|^)' + name + '(\\s|$)'));
  }
  /**
   * 添加类名
   * @param {Object} ele dom
   * @param {String} name 名字
   * addClass(new DomFn().$(".test")[0],'initial1')-><p class="test initial initial1">test initial</p>
   */
  addClass(ele, name) {
    if (!this.hasClass(ele, name)) ele.className += " " + name;
  }
  /**
   * 删除类名
   * @param {Object} ele dom
   * @param {String} name 名字
   * removeClass(new DomFn().$(".test")[0],'initial')-><p class="test">test initial</p>
   */
  removeClass(ele, name) {
    if (this.hasClass(ele, name)) {
      var reg = new RegExp('(\\s|^)' + name + '(\\s|$)');
      ele.className = ele.className.replace(reg, '');
    }
  }
  /**
   * 替换类名
   * @param {Object} ele dom
   * @param {String} newName 新名字
   * @param {String} oldName 老名字
   * replaceClass(new DomFn().$(".test")[0],'test1','test')-><p class="initial test1">test initial</p>
   */
  replaceClass(ele, newName, oldName) {
    this.removeClass(ele, oldName);
    this.addClass(ele, newName);
  }
  /**
   * 获取data-
   * 如果不存在，就添加data-${val}
   * @param {Object} ele  dom
   * @param {String} name 名字
   * @param {String} val 值
   * getData(new DomFn().$(".test")[0],'name')->hello world
   */
  getData(ele, name, val) {
    const prefix = 'data-'
    if (val) {
      return ele.setAttribute(prefix + name, val)
    }
    return ele.getAttribute(prefix + name)
  }
  /**
   * 内置方法
   */
  vendor() {
    let elementStyle = document.createElement('div').style
    let transformNames = {
      webkit: 'webkitTransform',
      Moz: 'MozTransform',
      O: 'OTransform',
      ms: 'msTransform',
      standard: 'transform'
    }
    for (let key in transformNames) {
      if (elementStyle[transformNames[key]] !== undefined) {
        return key
      }
    }
    return false
  }
  /**
   * 添加css兼容头
   * @param {String} style 
   * const dom = new DomFn().$(".test");
    const transition = new DomFn().prefixStyle('transform');
    dom[0].style[transition] = `translate3d(10px,10px,0) scale(1)`
    console.log(dom[0].style.webkitTransform)
    <p class="test initial" data-name="hello world" style="transform: translate3d(10px, 10px, 0px) scale(1);">test initial</p>
   */
  prefixStyle(style) {
    if (this.vendor() === false) {
      return false
    }
    if (this.vendor() === 'standard') {
      return style
    }
    return this.vendor() + style.charAt(0).toUpperCase() + style.substr(1)
  }
  /**
   * 获取兄弟节点
   * @param {Object} ele dom
   * siblings(dom[0]) -> [p, p]
   */
  siblings(ele) {
    console.log(ele.parentNode)
    var chid = ele.parentNode.children,
      eleMatch = [];
    for (var i = 0, len = chid.length; i < len; i++) {
      if (chid[i] != ele) {
        eleMatch.push(chid[i]);
      }
    }
    return eleMatch;
  }
  /**
   * 获取行间样式属性
   * @param {Object} ele dom
   * @param {String} name 名字
   * getByStyle(dom[0],'color')->rgb(255, 0, 0)
   */
  getByStyle(ele, name) {
    if (ele.currentStyle) {
      return ele.currentStyle[name];
    } else {
      return getComputedStyle(ele, false)[name];
    }
  }
}
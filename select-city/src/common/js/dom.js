export function hasClass(el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}

export function addClass(el, className) {
  if (hasClass(el, className)) {
    return
  }

  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}
export function getData(el, name, val) {
  const prefix = 'data-'
  if (val) {
    return el.setAttribute(prefix + name, val)
  }
  return el.getAttribute(prefix + name)
}
// js封装兼容各大浏览器的css3属性
let elementStyle = document.createElement('div').style
let vendor = (() => {
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
})()
export function prefixStyle(style) {
  if (vendor === false) {
    return false
  }

  if (vendor === 'standard') {
    return style
  }

  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}
// 更改标题
export function changeTitle(title){
   setTimeout(function(){
      //利用iframe的onload事件刷新页面 
      document.title = title; 
      var iframe = document.createElement('iframe');
      iframe.style.visibility = 'hidden'; 
      iframe.style.width = '1px'; 
      iframe.style.height = '1px'; 
      iframe.onload = function () { 
          setTimeout(function () {
              document.body.removeChild(iframe); 
          }, 0); 
      }; 
      document.body.appendChild(iframe);
  },0);
}
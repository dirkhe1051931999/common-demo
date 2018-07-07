/**
 * 常用工具类
 * Author:hejian
 * Date:2018-3-1
 */

(function() {
  var Jen = Jen || {};
  Jen.areas = window.JEN_AREAS || {}
  // 判断类型
  Jen.TypeJudge = {
    isString: function(o) { //是否为字符串
      return Object.prototype.toString.call(o).slice(8, -1) === "String"
    },
    isNumber: function(o) { //是否为数字
      return Object.prototype.toString.call(o).slice(8, -1) === "Number"
    },
    isObj: function(o) { //是否为对象
      return Object.prototype.toString.call(o).slice(8, -1) === "Object"
    },
    isArray(o) { //是否数组
      return Object.prototype.toString.call(o).slice(8, -1) === 'Array'
    },
    isDate(o) { //是否时间
      return Object.prototype.toString.call(o).slice(8, -1) === 'Date'
    },
    isBoolean(o) { //是否boolean
      return Object.prototype.toString.call(o).slice(8, -1) === 'Boolean'
    },
    isFunction(o) { //是否函数
      return Object.prototype.toString.call(o).slice(8, -1) === 'Function'
    },
    isNull(o) { //是否为null
      return Object.prototype.toString.call(o).slice(8, -1) === 'Null'
    },
    isUndefined(o) { //是否undefined
      return Object.prototype.toString.call(o).slice(8, -1) === 'Undefined'
    },
    isFalse(o) {
      if (!o || o === 'null' || o === 'undefined' || o === 'false' || o === 'NaN')
        return true
    },
    isTrue(o) {
      return !this.isFalse(o)
    }
  }
  // 判断浏览器类型
  Jen.browserType = function() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
    var isEdge = userAgent.indexOf("Edge") > -1; //判断是否IE的Edge浏览器
    var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
    var isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf('Chrome') == -1 //判断是否Safari浏览器
    var isChrome = userAgent.indexOf("CriOS") > -1 && userAgent.indexOf('Safari') > -1 //判断Chrome浏览器
    if (isIE) {
      var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
      reIE.test(userAgent);
      var fIEVersion = parseFloat(RegExp["$1"]);
      if (fIEVersion == 7)
        return "IE7"
      else if (fIEVersion == 8)
        return "IE8";
      else if (fIEVersion == 9)
        return "IE9";
      else if (fIEVersion == 10)
        return "IE10";
      else if (fIEVersion == 11)
        return "IE11";
      else
        return "IE7以下" //IE版本过低
      }

    if (isFF)
      return "FF";
    if (isOpera)
      return "Opera";
    if (isEdge)
      return "Edge";
    if (isChrome)
      return "Chrome";
    if (isSafari)
      return "Safari";
    }
  // 判断字符串类型
  Jen.checkStr = function(str, type) {
    switch (type) {
      case 'phone': //手机号码
        return /^1[3|4|5|7|8][0-9]{9}$/.test(str);
      case 'tel': //座机
        return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
      case 'card': //身份证
        return /^\d{15}|\d{18}$/.test(str);
      case 'pwd': //密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线
        return /^[a-zA-Z]\w{5,17}$/.test(str)
      case 'postal': //邮政编码
        return /[1-9]\d{5}(?!\d)/.test(str);
      case 'QQ': //QQ号
        return /^[1-9][0-9]{4,9}$/.test(str);
      case 'email': //邮箱
        return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
      case 'money': //金额(小数点2位)
        return /^\d*(?:\.\d{0,2})?$/.test(str);
      case 'URL': //网址
        return /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(str)
      case 'IP': //IP
        return /((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/.test(str);
      case 'date': //日期时间
        return /^(\d{4})\-(\d{2})\-(\d{2}) (\d{2})(?:\:\d{2}|:(\d{2}):(\d{2}))$/.test(str) || /^(\d{4})\-(\d{2})\-(\d{2})$/.test(str)
      case 'number': //数字
        return /^[0-9]$/.test(str);
      case 'english': //英文
        return /^[a-zA-Z]+$/.test(str);
      case 'chinese': //中文
        return /^[\u4E00-\u9FA5]+$/.test(str);
      case 'lower': //小写
        return /^[a-z]+$/.test(str);
      case 'upper': //大写
        return /^[A-Z]+$/.test(str);
      case 'HTML': //HTML标记
        return /<("[^"]*"|'[^']*'|[^'">])*>/.test(str);
      default:
        return true;
    }
  }
  //格式化时间
  Jen.formatTime = function(format) {
    var newDate = new Date();
    var date = {
      "M+": newDate.getMonth() + 1,
      "d+": newDate.getDate(),
      "h+": newDate.getHours(),
      "m+": newDate.getMinutes(),
      "s+": newDate.getSeconds(),
      "q+": Math.floor((newDate.getMonth() + 3) / 3),
      "S+": newDate.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
      format = format.replace(RegExp.$1, (newDate.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in date) {
      if (new RegExp("(" + k + ")").test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length == 1
          ? date[k]
          : ("00" + date[k]).substr(("" + date[k]).length));
      }
    }
    return format;
  }
  // 判断一个元素是否在数组中
  Jen.contains = function(arr, val) {
    return arr.indexOf(val) != -1
      ? true
      : false
  }
  /*
  * 字符串去除空格
  * @param  {str}
  * @param  {type}
  * type:  1-所有空格  2-前后空格  3-前空格 4-后空格
  * @return {String}
  */
  Jen.trim = function(str, type) {
    type = type || 1
    switch (type) {
      case 1:
        return str.replace(/\s+/g, "");
      case 2:
        return str.replace(/(^\s*)|(\s*$)/g, "");
      case 3:
        return str.replace(/(^\s*)/g, "");
      case 4:
        return str.replace(/(\s*$)/g, "");
      default:
        return str;
    }
  }
  /*
  * @param  {str}
  * @param  {type}
  *type:  1:首字母大写  2：首页母小写  3：大小写转换  4：全部大写  5：全部小写
  * @return {String}
  */
  Jen.changeCase = function(str, type) {
    type = type || 4
    switch (type) {
      case 1:
        return str.replace(/\b\w+\b/g, function(word) {
          return word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase();
        });
      case 2:
        return str.replace(/\b\w+\b/g, function(word) {
          return word.substring(0, 1).toLowerCase() + word.substring(1).toUpperCase();
        });
      case 3:
        return str.split('').map(function(word) {
          if (/[a-z]/.test(word)) {
            return word.toUpperCase();
          } else {
            return word.toLowerCase()
          }
        }).join('')
      case 4:
        return str.toUpperCase();
      case 5:
        return str.toLowerCase();
      default:
        return str;
    }
  }
  // 有范围的随机数
  Jen.random = function(min, max) {
    if (arguments.length === 2) {
      return Math.floor(min + Math.random() * ((max + 1) - min))
    } else {
      return null;
    }
  }
  // 将阿拉伯数字翻译成中文的大写数字
  Jen.numToChNum=function(num){
    var AA = new Array("零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十");
     var BB = new Array("", "十", "百", "仟", "萬", "億", "点", "");
     var a = ("" + num).replace(/(^0*)/g, "").split("."),
         k = 0,
         re = "";
     for(var i = a[0].length - 1; i >= 0; i--) {
         switch(k) {
             case 0:
                 re = BB[7] + re;
                 break;
             case 4:
                 if(!new RegExp("0{4}//d{" + (a[0].length - i - 1) + "}$")
                     .test(a[0]))
                     re = BB[4] + re;
                 break;
             case 8:
                 re = BB[5] + re;
                 BB[7] = BB[5];
                 k = 0;
                 break;
         }
         if(k % 4 == 2 && a[0].charAt(i + 2) != 0 && a[0].charAt(i + 1) == 0)
             re = AA[0] + re;
         if(a[0].charAt(i) != 0)
             re = AA[a[0].charAt(i)] + BB[k % 4] + re;
         k++;
     }
      if(a.length > 1) // 加上小数部分(如果有小数部分)
     {
         re += BB[6];
         for(var i = 0; i < a[1].length; i++)
             re += AA[a[1].charAt(i)];
     }
     if(re == '一十')
         re = "十";
     if(re.match(/^一/) && re.length == 3)
         re = re.replace("一", "");
    return re;
  }
  // 将数字转成大写金额
Jen.numToMoneyWord=function(Num) {
  Num = ~~Num;
  //判断如果传递进来的不是字符的话转换为字符
  if (typeof Num == "number") {
    Num = new String(Num);
  };

  Num = Num.replace(/,/g, "") //替换tomoney()中的“,”
  Num = Num.replace(/ /g, "") //替换tomoney()中的空格
  Num = Num.replace(/￥/g, "") //替换掉可能出现的￥字符
  if (isNaN(Num)) { //验证输入的字符是否为数字
    //alert("请检查小写金额是否正确");
    return "";
  };
  // console.log(Num);
  //字符处理完毕后开始转换，采用前后两部分分别转换
  var part = String(Num).split(".");
  var newchar = "";
  //小数点前进行转化
  for (var i = part[0].length - 1; i >= 0; i--) {
    if (part[0].length > 10) {
      return "";
      //若数量超过拾亿单位，提示
    }
    var tmpnewchar = ""
    var perchar = part[0].charAt(i);
    switch (perchar) {
      case "0":
        tmpnewchar = "零" + tmpnewchar;
        break;
      case "1":
        tmpnewchar = "壹" + tmpnewchar;
        break;
      case "2":
        tmpnewchar = "贰" + tmpnewchar;
        break;
      case "3":
        tmpnewchar = "叁" + tmpnewchar;
        break;
      case "4":
        tmpnewchar = "肆" + tmpnewchar;
        break;
      case "5":
        tmpnewchar = "伍" + tmpnewchar;
        break;
      case "6":
        tmpnewchar = "陆" + tmpnewchar;
        break;
      case "7":
        tmpnewchar = "柒" + tmpnewchar;
        break;
      case "8":
        tmpnewchar = "捌" + tmpnewchar;
        break;
      case "9":
        tmpnewchar = "玖" + tmpnewchar;
        break;
    }
    switch (part[0].length - i - 1) {
      case 0:
        tmpnewchar = tmpnewchar + "元";
        break;
      case 1:
        if (perchar != 0)
          tmpnewchar = tmpnewchar + "拾";
        break;
      case 2:
        if (perchar != 0)
          tmpnewchar = tmpnewchar + "佰";
        break;
      case 3:
        if (perchar != 0)
          tmpnewchar = tmpnewchar + "仟";
        break;
      case 4:
        tmpnewchar = tmpnewchar + "万";
        break;
      case 5:
        if (perchar != 0)
          tmpnewchar = tmpnewchar + "拾";
        break;
      case 6:
        if (perchar != 0)
          tmpnewchar = tmpnewchar + "佰";
        break;
      case 7:
        if (perchar != 0)
          tmpnewchar = tmpnewchar + "仟";
        break;
      case 8:
        tmpnewchar = tmpnewchar + "亿";
        break;
      case 9:
        tmpnewchar = tmpnewchar + "拾";
        break;
    }
    var newchar = tmpnewchar + newchar;
  }
//小数点之后进行转化
if(Num.indexOf(".") != -1) {
    if(part[1].length > 2) {
        // alert("小数点之后只能保留两位,系统将自动截断");
        part[1] = part[1].substr(0, 2)
    }
    for(i = 0; i < part[1].length; i++) {
        tmpnewchar = ""
        perchar = part[1].charAt(i)
        switch(perchar) {
            case "0":
                tmpnewchar = "零" + tmpnewchar;
                break;
            case "1":
                tmpnewchar = "壹" + tmpnewchar;
                break;
            case "2":
                tmpnewchar = "贰" + tmpnewchar;
                break;
            case "3":
                tmpnewchar = "叁" + tmpnewchar;
                break;
            case "4":
                tmpnewchar = "肆" + tmpnewchar;
                break;
            case "5":
                tmpnewchar = "伍" + tmpnewchar;
                break;
            case "6":
                tmpnewchar = "陆" + tmpnewchar;
                break;
            case "7":
                tmpnewchar = "柒" + tmpnewchar;
                break;
            case "8":
                tmpnewchar = "捌" + tmpnewchar;
                break;
            case "9":
                tmpnewchar = "玖" + tmpnewchar;
                break;
        }
        if(i == 0) tmpnewchar = tmpnewchar + "角";
        if(i == 1) tmpnewchar = tmpnewchar + "分";
        newchar = newchar + tmpnewchar;
    }
}
  //替换所有无用汉字
  while(newchar.search("零零") != -1)
      newchar = newchar.replace("零零", "零");
      newchar = newchar.replace("零亿", "亿");
      newchar = newchar.replace("亿万", "亿");
      newchar = newchar.replace("零万", "万");
      newchar = newchar.replace("零元", "元");
      newchar = newchar.replace("零角", "");
      newchar = newchar.replace("零分", "");
  if(newchar.charAt(newchar.length - 1) == "元") {
      newchar = newchar + "整"
  }
  return newchar;
}
// 模拟getElement...
  Jen.getElement =function(selector){
    var type = selector.substring(0, 1);
    if (type === '#') {
       if (document.querySelecotor) return document.querySelector(selector)
           return document.getElementById(selector.substring(1))
   }else if (type === '.') {
       if (document.querySelecotorAll) return document.querySelectorAll(selector)
           return document.getElementsByClassName(selector.substring(1))
   }else{
       return document['querySelectorAll' ? 'querySelectorAll':'getElementsByTagName'](selector)
   }
  }
// 检测类名
Jen.hasClass  =function(ele,name){
    return ele.className.match(new RegExp('(\\s|^)' + name + '(\\s|$)'));
  }
// 添加类名
 Jen.addClass  =function(ele,name){
  if (!this.hasClass(ele, name)) ele.className += " " + name;
 }
// 删除类名
Jen.removeClass = function(ele,name){
  if (this.hasClass(ele, name)) {
        var reg = new RegExp('(\\s|^)' + name + '(\\s|$)');
        ele.className = ele.className.replace(reg, '');
    }
}
// 替换类名
Jen.replaceClass =function(ele, newName, oldName) {

    this.removeClass(ele, oldName);

    this.addClass(ele, newName);

}
// 获取兄弟节点
Jen.siblings =function(ele) {
    // console.log(ele.parentNode)
    var chid = ele.parentNode.children,eleMatch = [];
    for(var i = 0, len = chid.length; i < len; i ++){
        if(chid[i] != ele){
            eleMatch.push(chid[i]);
        }
    }
    return eleMatch;
}
// 获取行内样式
Jen.getByStyle =function(obj,name){

    if(obj.currentStyle){

        return  obj.currentStyle[name];

    }else{

        return  getComputedStyle(obj,false)[name];

    }
}
// 设置cookie chrome本地无法设置cookie
Jen.setCookie = function(name, value, day) {
  var setting = arguments[0];
  if (Object.prototype.toString.call(setting).slice(8, -1) === 'Object') {

    for (var i in setting) {
      var oDate = new Date();
      oDate.setDate(oDate.getTime() + day * 24 * 60 * 60 * 1000);
      document.cookie = i + '=' + setting[i] + ';expires=' + oDate;
    }
  } else {
    var oDate = new Date();
    oDate.setDate(oDate.getTime() + day * 24 * 60 * 60 * 1000);
    console.log()
    document.cookie = name + '=' + value + ';expires=' + oDate;
  }
}
// 获取cookie
Jen.getCookie=function(name) {
  var arr = document.cookie.split('; ');
  for (var i = 0; i < arr.length; i++) {
    var arr2 = arr[i].split('=');
    if (arr2[0] == name) {
      return arr2[1];
    }
  }
  return '';
}
// 删除cookie
Jen.removeCookie =function(name) {
    this.setCookie(name, '', -1);
}
// 设置localStorage
// var _this = this
var ls = window.localStorage
Jen.setLocal=function(key, val) {
  var setting = arguments[0];
  if (Object.prototype.toString.call(setting).slice(8, -1) === 'Object') {
    for (var i in setting) {
      ls.setItem(i, JSON.stringify(setting[i]))
    }
  } else {
    ls.setItem(key, JSON.stringify(val))
  }
}
// 获取localStorage
Jen.getLocal=function(key) {
  if (key)
    return JSON.parse(ls.getItem(key))
  return null;
}
// 移除localStorage
Jen.removeLocal=function(key) {
  ls.removeItem(key)
}
// 移除所有localStorage
Jen.clearAllLocal=function() {
  ls.clear()
}
// 获取网址参数
Jen.getURL = function(url) {
  var result = {};
  var reg = new RegExp('([\\?|&])(.+?)=([^&?]*)', 'ig');
  var arr = reg.exec(url);
  while (arr) {
    result[arr[2]] = arr[3];
    arr = reg.exec(url);
  }
  return result;
}
// 删除url指定参数，返回url
Jen.delParamsUrl=function(url, key){
    var baseUrl = url.split('?')[0] + '?';
    var query = url.split('?')[1];
    if (query.indexOf(key)>-1) {
        var obj = {}
        var arr = query.split("&");
        for (var i = 0; i < arr.length; i++) {
            arr[i] = arr[i].split("=");
            obj[arr[i][0]] = arr[i][1];
        };
        delete obj[key];
        var url = baseUrl + JSON.stringify(obj).replace(/[\"\{\}]/g,"").replace(/\:/g,"=").replace(/\,/g,"&");
        return url
    }else{
         return url;
    }
}
// 获取16进制随机色
Jen.getRandomColor =function() {
    return '#' + (function(h) {
        return new Array(7 - h.length).join("0") + h;
    })((Math.random() * 0x1000000 << 0).toString(16));
}
// 懒加载
// 先加载image对象，滚动监听，图片出现在视窗赋予其真实地址，实现缓慢加载img
Jen.lazyLoad = function(){
var bodyScrollHeight = document.body.scrollTop; // body滚动高度
var windowHeight = window.innerHeight; // 视窗高度
var imgs = document.getElementsByClassName('my-photo');
for (var i = 0; i < imgs.length; i++) {
  var imgHeight = imgs[i].offsetTop; // 图片距离顶部高度
  if (imgHeight < windowHeight + bodyScrollHeight) {
    imgs[i].src = imgs[i].getAttribute('data-src');
    // imgs[i].className = imgs[i].className.replace('my-photo', '')
  }
}
}
// 判断电话的运营商类型
Jen.PhoneUtils = {
  phoneRegexs :{
  //中国电信号码段
  CHINA_TELECOM_PATTERN: /^(?:\+86)?1(?:33|53|7[37]|8[019])\d{8}$|^(?:\+86)?1700\d{7}$/,
  //中国联通号码段
  CHINA_UNICOM_PATTERN: /^(?:\+86)?1(?:3[0-2]|4[5]|5[56]|7[56]|8[56])\d{8}$|^(?:\+86)?170[7-9]\d{7}$/,
  //中国移动号码段
  CHINA_MOBILE_PATTERN: /^(?:\+86)?1(?:3[4-9]|4[7]|5[0-27-9]|7[8]|8[2-478])\d{8}$|^(?:\+86)?1705\d{7}$/,
  //电话座机号码段
  PHONE_CALL_PATTERN: /^(?:\(\d{3,4}\)|\d{3,4}-)?\d{7,8}(?:-\d{1,4})?$/,
  //手机号码
  PHONE_PATTERN: /^(?:\+86)?(?:13\d|14[57]|15[0-35-9]|17[35-8]|18\d)\d{8}$|^(?:\+86)?170[057-9]\d{7}$/,
  //手机号简单校验，不根据运营商分类
  PHONE_SIMPLE_PATTERN: /^(?:\+86)?1\d{10}$/
},
  //电话座机号码段
  isPhoneCallNum: function(input) {
  return this.phoneRegexs.PHONE_CALL_PATTERN.test(input);
  },
  //中国电信号码段
  isChinaTelecomPhoneNum: function(input) {
  return this.phoneRegexs.CHINA_TELECOM_PATTERN.test(input);
  },
  //中国联通号码段
  isChinaUnicomPhoneNum: function(input) {
  return this.phoneRegexs.CHINA_UNICOM_PATTERN.test(input);
  },
  //中国移动号码段
  isChinaMobilePhoneNum: function(input) {
  return this.phoneRegexs.CHINA_MOBILE_PATTERN.test(input);
  },
  //手机号码
  isPhoneNum: function(input) {
  return this.phoneRegexs.PHONE_PATTERN.test(input);
  },
  //手机号简单校验，不根据运营商分类
  isPhoneNumBySize: function(input) {
  return this.phoneRegexs.PHONE_SIMPLE_PATTERN.test(input);
  }
}
//校验身份证与获取身份证信息
Jen.IdCardUtils = {
  idCardRegex: {
    //18位身份证简单校验
    IDCARD_18_SIMPLE_PATTERN: /^(?:1[1-5]|2[1-3]|3[1-7]|4[1-6]|5[0-4]|6[1-5])\d{4}(?:1[89]|20)\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])\d{3}(?:\d|[xX])$/,
    //15位身份证简单校验
    IDCARD_15_SIMPLE_PATTERN: /^(?:1[1-5]|2[1-3]|3[1-7]|4[1-6]|5[0-4]|6[1-5])\d{4}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])\d{3}$/
  },
  //18位身份证简单校验
  isSimpleIdCard18: function(idCard) {
    return this.idCardRegex.IDCARD_18_SIMPLE_PATTERN.test(idCard);
  },
  //15位身份证简单校验
  isSimpleIdCard15: function(idCard) {
    return this.idCardRegex.IDCARD_18_SIMPLE_PATTERN.test(idCard);
  },
  //18位身份证校验码校验
  checkCode: function(idCard) {
    var multiplier = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    var idDatas = idCard.split("");
    var len = 17;
    var sum = 0;
    for(var i = 0; i < len; i++) {
      sum += idDatas[i] * multiplier[i];
    }
    var remainder = sum % 11;
    var checkCodeArr = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
    var checkCode = checkCodeArr[remainder];
    return checkCode === idCard[17];
  },
  //18位身份证严格校验
  isIdCard18: function(idCard) {
    //先校验格式
    if(this.isSimpleIdCard18(idCard)) {
      //校验日期时间是否合法
      var dateStr = idCard.substr(6, 8);
      var dateStrNew = dateStr.replace(/(\d{4})(\d{2})(\d{2})/, "$1/$2/$3");
      var dateObj = new Date(dateStrNew);
      var month = dateObj.getMonth() + 1;
      if(parseInt(dateStr.substr(4, 2)) === month) {
        return this.checkCode(idCard);
      }
    }
    return false;
  },
  //根据18身份证号码获取人员信息
  getPersonInfo18:function(idCard){
    var age=0;
    var birthday='';
    var address='';
    var sex='';
    address=Jen.areas[idCard.substr(0,2)+'0000']+' '+Jen.areas[idCard.substr(0,4)+'00']+' '+Jen.areas[idCard.substr(0,6)];
    sex=(idCard.substr(16,1)%2===0)?'女':'男';
    birthday=idCard.substr(6,8).replace(/(\d{4})(\d{2})(\d{2})/,'$1年$2月$3日');
    age=new Date().getFullYear()-idCard.substr(6,4);
    var person={'address':address,'sex':sex,'birthday':birthday,'age':age};
    return person;
  }
};
  window['Jen'] = Jen
})()

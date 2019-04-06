class StringFn {
  /**
   * 去除空格
   * @param {String} str 字符串
   * @param {Number} type 1所有空格，2前后空格，3前空格，4后空格
   * trim(" asd as d ",2)->asd as d
   */
  trim(str, type) {
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
  /**
   *大小写转换
   * @param {String} str 
   * @param {Number} type  1首字母大写  2首页母小写  3大小写转换  4全部大写  5全部小写
   * changeCase("HELLO",5)->hello
   */
  changeCase(str, type) {
    type = type || 4
    switch (type) {
      case 1:
        return str.replace(/\b\w+\b/g, function (word) {
          return word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase();

        });
      case 2:
        return str.replace(/\b\w+\b/g, function (word) {
          return word.substring(0, 1).toLowerCase() + word.substring(1).toUpperCase();
        });
      case 3:
        return str.split('').map(function (word) {
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
  /**
   * 排列组合
   * @param {String} str 
   * anagrams("123")->["123", "132", "213", "231", "312", "321"]
   */
  anagrams(str) {
    if (str.length <= 2) return str.length === 2 ? [str, str[1] + str[0]] : [str];
    return str.split('').reduce((acc, letter, i) =>
      acc.concat(this.anagrams(str.slice(0, i) + str.slice(i + 1)).map(val => letter + val)), []);
  }
  /**
   * 反转字符串
   * @param {String} str 
   * reverseString("123")->321
   */
  reverseString(str) {
    return [...str].reverse().join('')
  }
  /**
   * 判断是否是回文
   * @param {String} str 
   * palindrome("tat")->true
   */
  palindrome(str) {
    const s = str.toLowerCase().replace(/[\W_]/g, '');
    return s === s.split('').reverse().join('');
  }
  /**
   * 字符串中相同字符出现的次数
   * @param {String} str
   * occurrences("你好世界，不，我不好")-> {你: 1, 好: 2, 世: 1, 界: 1, ，: 2, …}
   */
  occurrences(str) {
    return str.split('').reduce((p, k) => (p[k]++ || (p[k] = 1), p), {});
  }
}
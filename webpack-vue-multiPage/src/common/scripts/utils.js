let a = "test";
// 获取min到max之间的整数
export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
export function shuffle(arr) {
  var arrc = arr.slice();
  for (let i = 0; i < arrc.length; i++) {
    let j = getRandomInt(0, i);
    let t = arrc[i];
    arrc[i] = arrc[j];
    arrc[j] = t;
  }
  return arrc;
}
// 搜索节流处理
export function debounce(func, delay) {
  let timer;
  return function(...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
// 格式化时间
export function formatTime(interval) {
  interval = interval | 0;
  let minute = (interval / 60) | 0;
  let seconds = interval % 60;
  minute = minute <= 9 && minute >= 0 ? "0" + minute : minute;
  seconds = seconds <= 9 && seconds >= 0 ? "0" + seconds : seconds;
  return `${minute}:${seconds}`;
}

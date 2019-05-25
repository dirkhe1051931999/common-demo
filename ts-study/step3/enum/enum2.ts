// 手动赋值
// 不要出现覆盖现象，因为覆盖ts是无法察觉到的，
// 比如下例中Sun=2，Tue已经是2了，那么编译出来Days['Tue'] == 2 ， Days['Sun'] == 2
// 但是Days[2] == 'Tue',Day[2]!='Sun'
enum Days {
  Sun = 7,
  Mon = 1,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat
}
console.log(Days['Sun'] == 7);
console.log(Days['Tue'] == 2);

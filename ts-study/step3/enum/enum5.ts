// 外部枚举
// declare 定义的类型只会用于编译时的检查，编译结果中会被删除
// 外部枚举与声明语句一样，常出现在声明文件中
// declare 和 const可以共用
declare enum Direction1 {
  Up,
  Down,
  Left,
  Right
}
declare const enum Direction2 {
  Up,
  Down,
  Left,
  Right
}
let direction1 = [Direction1.Up, Direction1.Down, Direction1.Left, Direction1.Right];
let direction2 = [Direction2.Up, Direction2.Down, Direction2.Left, Direction2.Right];

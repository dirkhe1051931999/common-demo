// 当ts不确定联合类型是的变量是哪个类型的时候，访问此联合类型的所有类型里共有的属性或方法
function getLength(something: string | number): number {
  return something.length;
}


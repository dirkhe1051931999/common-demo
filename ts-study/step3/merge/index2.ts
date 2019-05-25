// 接口的合并
// 合并的属性的类型必须是唯一的
interface Car {
  price: number;
}
interface Car {
  age: string;
}
// 相当于
// interface Car {
//   price: number;
//   weight: number;
// }

interface Bike {
  price: number;
  alert(a: string): string;
}
interface Bike {
  name: string;
  alert(a: string, b: number): number;
}

// 相当于
interface Bike {
  price: number;
  name: string;
  alert(a: string): string;
  alert(a: string, b: number): number;
}

// undefined与void的区别是：undefined和null是所有基础类型的子类型，可以赋给number、string等基础类型，但是void类型就不能赋给number、string等基础类型
let u: undefined = undefined;
let n: null = null;

// 这样不会报错
let num: number = undefined;
let num2: string = undefined;
// 这样也不会报错
let u2: undefined;
let num3: number = u2;

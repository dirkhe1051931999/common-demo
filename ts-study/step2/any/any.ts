let number: any = 'seven';
number = 7;
number.number = 1;
number.number.number = 2;
number.set = function() {};
// 未声明类型的变量可以看做是任意类型
let number2;
number2 = 10;
number2 = 11;

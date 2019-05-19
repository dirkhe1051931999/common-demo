// 联合类型的变量在被赋值的时候，会根据类型推论的规则推断出一个类型

let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';
console.log(myFavoriteNumber.length);
myFavoriteNumber = 7;
// 被推断成string了，所以后来赋值是number，不存在length方法
console.log(myFavoriteNumber.length); 

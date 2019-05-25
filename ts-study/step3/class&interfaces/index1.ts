// 不同类之前可以有一些公有的特性，把这些公有的提成接口，用implements来实现
// 门是一个类，防盗门是门的子类，防盗门有报警，防盗门有开灯关灯
// 车是一个类，小卡车是车的子类，小卡车有报警，小卡车有开灯关灯
// 车是一个类，大卡车是车的子类，大卡车有报警，大卡车没有开灯关灯，大卡车的报警为吹笛子
// 把报警和灯提取出来，作为一个接口
// 报警接口
interface Alarm {
  alert();
}
// 开关灯接口
interface Light {
  lightOn();
  lightOff();
}
// 笛子接口
interface Flute extends Alarm {
  boast();
}

class Door {}
// 防盗门
class SecurityDoor extends Door implements Alarm, Light {
  alert() {
    console.log('防盗门报警');
  }
  lightOn() {
    console.log('防盗门选择开灯');
  }
  lightOff() {
    console.log('防盗门选择关灯');
  }
}

class Car {}
// 小卡车
class SmallCar extends Car implements Alarm, Light {
  alert() {
    console.log('小卡车报警');
  }
  lightOff() {
    console.log('小卡车选择关灯');
  }
  lightOn() {
    console.log('小卡车选择开灯');
  }
}
// 大卡车
class BigCar extends Car implements Flute {
  alert() {}
  boast() {}
}

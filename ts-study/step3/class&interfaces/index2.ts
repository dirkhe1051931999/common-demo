// 接口继承类
class Ponit {
  x: number;
  y: boolean;
}
interface Ponit3d extends Ponit {
  z: string;
}
let Ponit3d: Ponit3d = { x: 1, y: false, z: 'hello' };

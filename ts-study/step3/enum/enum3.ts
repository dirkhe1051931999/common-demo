// 枚举项有两种类型：常数项（constant member）和计算所得项（computed member）。
// 常数项分类：https://ts.xcatliu.com/advanced/enum#chang-shu-xiang-he-ji-suan-suo-de-xiang
enum Color {
  Red,
  Blue = 'blue'.length
}
// 如果紧接在计算所得项后面的是未手动赋值的项，那么就会因为无法获取初始化而报错
// 报错
enum Color2 {
  Blue = 'blue'.length,
  Red
}
// 不报错
enum Color3 {
  Blue = 'blue'.length,
  Red = 1.5
}

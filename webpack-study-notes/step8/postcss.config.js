module.exports = {
  plugins: [
    // css3前缀
    require('postcss-cssnext')({}),
    // 解决1px问题
    require('postcss-write-svg')({
      // svg转base64
      utf8: false
    }),
    // px转vw
    require('postcss-px-to-viewport')({
      // 要转换的单位
      unitToConvert: 'px',
      // 视觉稿宽度
      viewportWidth: 750,
      // 哪些属性转
      propList: ['*'],
      // 保留位数
      unitPrecision: 4,
      // 转换成vw
      viewportUnit: 'vw',
      // 指定不转换为视窗单位的类
      selectorBlackList: ['.ignore'],
      // 最小的转换单位
      minPixelValue: 1,
      // 是否允许在媒体查询中转换px，一般不允许
      mediaQuery: false,
      // 忽略转换的文件夹
      exclude: /node_modules/
    }),
    // 自动添加vw的hack代码
    require('postcss-viewport-units')({})
  ]
}

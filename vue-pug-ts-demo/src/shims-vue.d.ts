// 主要用于 TypeScript 识别.vue 文件，Ts 默认并不支持导入 vue 文件
// 这个文件告诉 ts 导入.vue 文件都按VueConstructor<Vue>处理
// 会有一个问题，.vue 文件的路径是错的，但不会检测到错误
declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}
declare module 'vue-awesome-swiper' {
  export const swiper: any
  export const swiperSlide: any
}

# vue+ts 实现 qq 音乐首页 demo

> 如果对 vue+ts 的环境搭建不太熟悉，可以参考这篇[vue+typescript+tslint 环境搭建](https://github.com/dirkhe1051931999/common-demo/tree/master/vue-with-ts-env)

## 功能

1. vue-cli3.0
2. 轮播
3. 动画
4. vue-router.ts
5. vue-property-decorator 的使用
6. pug
7. 如何引入 swiper(shims-vue.d.ts declare)
8. .vue 中用类的风格
9. tslint

## 如何使用

npm install

npm run serve

## 实现效果

![效果](./screenshot/app.png)

## vue 中类的风格

```vue
import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator'
import board from "common/mock/board.js";
@Component
export default class Board extends Vue {
  // props
  @Prop({ default: false })
  visible!: boolean;
  @Prop({ default: "" })
  comment_id!: string;
  // lifecycle hook
  mounted() {
    console.log(this.board);
  }
  // initial data
  btnLoading: boolean = false;
  content: any = "";
  board: Array<any> = board.list;

  // computed
  get dialogVisible() {
    return false;
  }
  // watch
  @Watch('child')
  onChildChanged(val: string, oldVal: string) { }
  // watch: {
  //   'child': {
  //     handler: 'onChildChanged',
  //     immediate: false,
  //     deep: false
  //   }
  // }

  // this.$emit
  @Emit()
  cancel() {}
  @Emit("handleOk")
  async handleOk() {
    await const res: any = await  dialogVisible()
  }
}
```

## vue 中如何使用 pug

> 很多人都知道 jade（现在叫 pug）和 [ejs](https://ejs.bootcss.com/) 模版，ejs 是刚接触 node 的时候，学习 express 常用的模版引擎，我之前也用，我感觉 ejs 不错，直到今天在 vue 中用了 pug，才感觉写 html 也能写的如此舒服。至于为什么 jade 要改名叫 pug，看下知乎就明白了，[如何看待模板引擎 Jade 改名为 Pug？](https://www.zhihu.com/question/46418330)

> [pug](https://pug.bootcss.com/language/attributes.html) 是一个高性能的模板引擎，是用 JavaScript 实现的, 还可以供 Node 使用。

>

### 举几个例子 🌰

### pug 中使用 v-for，v-if，eventBind 等

```pug
.board-wrap {{dialogVisible}}
    .wrap(v-for="(item,index) in board" :key="index")
    .city 杭州
    .search-wrap(ref="search" )
      span(ref="placeholder" v-if="!searchValue") 输入你喜欢的爱豆~
      input(v-model="searchValue" ref="input" @fucus="onfocus" @blur="onBlur" @input="onValueChange")
    .user
      .icon
```

> 对应的 html

```html
<div class="board-wrap">
  {{dialogVisible}}
  <div class="wrap" v-for="(item,index) in board" :key="index"></div>
  <div class="city">杭州</div>
  <div class="search-wrap" ref="search"><span ref="placeholder" v-if="!searchValue">输入你喜欢的爱豆~</span><input v-model="searchValue" ref="input" @fucus="onfocus" @blur="onBlur" @input="onValueChange" /></div>
  <div class="user">
    <div class="icon"></div>
  </div>
</div>
```

### pug 中用第三方组件

```pug
  swiper.swiperBox(:option="swiperOption")
    swiper-slide.page(v-for="(item,index) in modules" :key="index")
      img(:src="item.imgUrl" :alt="item.name")
    .swiper-pagination(slot="pagination")
```

> 对应的 html

```html
<swiper class="swiperBox" :option="swiperOption">
  <swiper-slide class="page" v-for="(item,index) in modules" :key="index"><img :src="item.imgUrl" :alt="item.name"/></swiper-slide>
  <div class="swiper-pagination" slot="pagination"></div>
</swiper>
```

### 如何使用

- vue-cli3

```bash
npm i -D pug pug-html-loader pug-plain-loader
```

```js
// vue.config.js
module.exports = {
  chainWebpack: (config) => {
    config.module
      .rule('pug')
      .test(/\.pug$/)
      .use('pug-html-loader')
      .loader('pug-html-loader')
      .end();
  }
};
```

- vue-cli2

```bash
npm i -D pug pug-html-loader
```

```js
module: {
  rules: [
    {
      test: /\.pug$/,
      loader: 'pug-html-loader'
    }
    // 省略其他规则
  ];
}
```

## 参考

[vscode 中开发 vue 的最佳实践](https://github.com/coppyC/blog/issues/1)

[可能是最全的 Vue-TypeScript 教程(附实例代码和一键构建工具)](https://segmentfault.com/a/1190000012486378)

[vue + typescript + element-ui 支持 markdown 渲染的博客前台展示](https://github.com/biaochenxuying/blog-vue-typescript)

# vue+typescript+tslint 环境搭建

> 之前有写一篇博客[vue-cli3.0 使用教程](https://github.com/dirkhe1051931999/hjBlog/blob/master/blog-webpack/lessons/02.md)，如果对 vue-cli 的基本使用还不太熟悉，可以参考这个

## 初始化项目

1. 选择自定义模版

![1](/vue-with-ts-env/screenshot/vue-with-ts-env-1.png)

2. 选择合适的配置项

![2](/vue-with-ts-env/screenshot/vue-with-ts-env-2.png)

3. 使用 vue-class-component 作为 TypeScript 装饰器

![3](/vue-with-ts-env/screenshot/vue-with-ts-env-3.png)

4. 使用 babel 编译 ts

![4](/vue-with-ts-env/screenshot/vue-with-ts-env-4.png)

5. 不使用 history mode for router

![5](/vue-with-ts-env/screenshot/vue-with-ts-env-5.png)

6. 使用 less

![6](/vue-with-ts-env/screenshot/vue-with-ts-env-6.png)

7. 选择 tslint、选择在 save 的时候 lint

![7](/vue-with-ts-env/screenshot/vue-with-ts-env-7.png)

8. 选择分 In dedicated config files(专门的配置文件),会自动生成一个 vue.config.js 的文件，这样不跟 package.json 揉在一起

![8](/screenshot/vue-with-ts-env-8.png)

9. 作为一个 preset

![9](/screenshot/vue-with-ts-env-9.png)

## 安装 tslint

1. [官网规则](https://palantir.github.io/tslint/rules/)
2. [比较全面的 tslint 配置](https://juejin.im/post/5b3859a36fb9a00e4d53fc85)
3. [tslint 的参数中文解释 1](https://blog.csdn.net/yzzane/article/details/79656740)
4. [tslint 的参数中文解释 2](https://zhuanlan.zhihu.com/p/29970355)

```bash
npm install --save-dev tslint-eslint-rules
```

### tslint.json

> 新建一个 tslint.json，进行配置

```js
{
  //有错误时，默认提示的严重程度，此处设置的提示，将应用于所有规则
  "defaultSeverity": "warning",
  // 内置配置预设名称，一般采用其官方推荐的值，此值较为稳定:tslint:recommended
  "extends": ["tslint:recommended"],
  // 设置检查的地方
  "linterOptions": {
    "exclude": ["node_modules/**"]
  },
  // 检查规则
  "rules": {
    // 引号的使用规则
    "quotemark": [true, "single"],
    // 使用Tab进行缩进，每次强制缩进2个字符
    "indent": [true, "spaces", 2],
    // interface是否限制
    "interface-name": false,
    // import名称排序问题，要求按照字母从小到大排序，关闭这个
    "ordered-imports": false,
    // 检查对象文字中键的排序
    "object-literal-sort-keys": false,
    // 允许空格结尾
    "no-trailing-whitespace": false,
    // 允许有空行
    "no-consecutive-blank-lines": false,
    // 分号的使用规则
    "semicolon": [true, "never"],
    //对尾随逗号的校验
    "trailing-comma": [true, { "multiline": "never", "singleline": "never" }]
  }
}
```

## 从 Github repo 使用 preset

[如何使用 vue-cli 3 的 preset 打造基于 git repo 的前端项目模板](https://segmentfault.com/a/1190000016389996)

```bash
vue init SimonZhangITer/vue-typescript-template my-project
```

## 文件夹

```txt
- public 静态文件夹
- src    业务文件
  - common mock/images/scripts
  - components 木偶组件
  - store vuex用于 TypeScript 识别.vue 文件，Ts 默认并不支持导入 vue 文件
- shims-tsx.d.ts 在ts
  - views 智能组件
  - api http
- shims-vue.d.ts 主要中使用jsx语法，如果不使用jsx语法，无视这个
```

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 使用es6语法
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
// vuex
import store from "./store/index.js"
// 导入index文件
import  'common/less/index.less'
// 引入fastclick
import Fastclick from "fastclick"
// body下面的所有点击没有300ms的延迟
Fastclick.attach(document.body)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

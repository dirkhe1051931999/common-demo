import Vue from "vue";
import PageA from "@/pageA.vue";
// 路由
import router from "router/pageA/index.js";
import store from "store/pageA/index.js";
import "common/styles/index";
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(PageA)
}).$mount("#app");

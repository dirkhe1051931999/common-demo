import Vue from "vue";
import PageB from "@/pageB.vue";
import router from "router/pageB/index.js";
import "common/styles/index";
Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(PageB)
}).$mount("#app");

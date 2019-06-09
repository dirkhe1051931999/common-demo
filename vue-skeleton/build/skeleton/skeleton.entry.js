import Vue from "vue";
import Skeleton from "./skeleton.home.vue";
import SkeletonComponents from "components/skeleton/install";
Vue.use(SkeletonComponents);
export default new Vue({
  components: {
    Skeleton
  },
  template: "<skeleton />"
});

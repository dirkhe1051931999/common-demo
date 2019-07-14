import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);
const router = new Router({
  routes: [
    {
      path: "/a",
      name: "A",
      component: () => import("views/pageA/a.vue")
    },
    {
      path: "/b",
      name: "B",
      component: () => import("views/pageA/b.vue")
    }
  ]
});

export default router;

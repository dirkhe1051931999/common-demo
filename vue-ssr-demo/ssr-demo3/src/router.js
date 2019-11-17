import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export function createRouter() {
  return new Router({
    mode: "history",
    routes: [
      {
        path: "/home",
        component: resolve => require(["./views/home"], resolve)
      },
      {
        path: "/item",
        component: resolve => require(["./views/item"], resolve)
      },
      {
        path: "*",
        redirect: "/home"
      }
    ]
  });
}

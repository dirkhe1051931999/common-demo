import Vue from 'vue'
import Router from 'vue-router'
// import Demo1 from "@/components/demo1"
// import Demo2 from "@/components/demo2"
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: "/demo1"
    },
    {
      path: "/demo1",
      component: () => import("../components/demo1.vue")
    },
    {
      path: "/demo2",
      component: () => import("../components/demo2.vue")
    }
  ]
})

import Vue from 'vue'
import Router from 'vue-router'
import Index from "@/components/index"
import Page1 from "@/components/page1"
import Page2 from "@/components/page2"
import Page3 from "@/components/page3"

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'index',
      component: Index,
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/page1",
      name: "page1",
      component: Page1,
      meta: {
        keepAlive: true,
        isBack: false
      }
    },
    {
      path: "/page2",
      name: "page2",
      component: Page2,
      meta: {
        keepAlive: true,
        isBack: false
      }
    },
    {
      path: "/page3",
      name: "page3",
      component: Page3,
      meta: {
        keepAlive: false,
      }
    }
  ]
})
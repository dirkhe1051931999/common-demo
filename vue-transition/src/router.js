import Vue from 'vue'
import Router from 'vue-router'
import Parent from '@/components/parent'
import Navigation from '@/components/navigation'
import PageA from '@/components/pageA'
import PageB from '@/components/pageB'

Router.prototype.goBack = function () {
  this.isBack = true
  window.history.go(-1)
}

Vue.use(Router)
const router = new Router({
  routes: [{
    path: '/',
    component: Parent,
    meta: {
      keepAlive: true
    },
    children: [{
      path: "/",
      component: Navigation,
      meta: {
        name: "首页",
        keepAlive: true
      }
    }, {
      path: '/pageA',
      component: PageA,
      meta: {
        name: "页面A",
        keepAlive: true
      }
    }, {
      path: '/pageB',
      component: PageB,
      meta: {
        name: "页面B",
        keepAlive: false
      }
    }]
  }]
})

export default router
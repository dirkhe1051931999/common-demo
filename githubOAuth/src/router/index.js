import Vue from 'vue'
import Router from 'vue-router'
import Navigate from '@/components/navigate'
import Home from '@/components/home'
import Login from '@/components/login'

Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [{
      path: '/',
      name: 'Navigate',
      component: Navigate
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})

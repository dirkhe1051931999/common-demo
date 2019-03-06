import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Logout from '@/components/logout'
import GetUserInfo from '@/components/getUserInfo'
import GetData from '@/components/getData'

Vue.use(Router)

const router = new Router({
  mode: "history",
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/logout',
      name: 'logout',
      component: Logout,
      meta:{
        requireAuth: true
      }
    },
    {
      path: '/userInfo',
      name: 'GetUserInfo',
      component: GetUserInfo,
      meta:{
        requireAuth: true
      }
    },
    {
      path: '/getdata',
      name: 'GetData',
      component: GetData,
      meta:{
        requireAuth: false
      }
    }
  ]
})
// to即将要进入的路由
// from导航要离开的路由
// next next()是进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed ，next("/")搜跳转到一个不同的地址
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    const token = localStorage.getItem('HAS_SET_TOKEN');
    if (token && token !== 'null') {
      next(); 
    } else {
      next('/login');
    }
  } else {
    next(); 
  }
});
export default router;

import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:"/pagination"
    },
    {
      path: '/pagination',
      name: 'pagination',
      component: ()=>import('../page/index')
    }
  ]
})

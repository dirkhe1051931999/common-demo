import Vue from 'vue'
import Router from 'vue-router'
import City from 'components/city/city.vue'
import Search from 'components/search/search.vue'
import Select from "components/select/select.vue"
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/select',
      component:Select
    },
    {
      path: '/city',
      component:City
    },
    {
      path: '/search',
      component:Search
    },
  ]
})

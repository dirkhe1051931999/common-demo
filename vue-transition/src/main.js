import Vue from 'vue'
import App from './App.vue'
import Header from '@/components/header'
import router from './router'

Vue.config.productionTip = false
Vue.use(Header)
Vue.component('Header', Header)
new Vue({
  router,
  components: {
    Header
  },
  render: h => h(App)
}).$mount('#app')
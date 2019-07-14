import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
var store = new Vuex.Store({
  state: {
    msg: "hello vuex"
  },
  getters: {
    msg(state) {
      return state.msg;
    }
  }
});
export default store;

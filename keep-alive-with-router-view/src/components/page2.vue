<template>
  <div>
    <p>page2</p>
    <p>{{msg}}</p>
    <button @click="$router.go(-1)">返回</button>
    <button @click="$router.push('page3')">前进</button>
  </div>
</template>

<script>
import mixins from "./mixin"
export default {
  mixins: [mixins],
  components: {},
  name: '',
  data() {
    return {

    }
  },
  methods: {

  },
  beforeRouteEnter(to, from, next) {
    console.log('page2的', 'beforeRouteEnter')
    if (from.name == 'page3') {
      to.meta.isBack = true;
    }
    next();
  },
  created() {
    console.log('page2的', 'created')
    // 这样做的目的是为了用户在当前路由页刷新页面，也要重新请求接口
    this.isFirstEnter = true;
  },
  mounted() {
    console.log('page2的', 'mounted')
  },
  activated() {
    console.log('page2的', 'activated')
    // 如果不是返回的页面或者是第一次进入的页面就要请求接口数据
  },
  deactivated() {
    console.log('page2的', 'deactivated')
  },
  destroyed() {
    console.log('page2的', 'destroyed')
  }
}
</script>

<style scoped lang='less'>
</style>

<template>
  <div>
    <p>page1</p>
    <p>{{msg}}</p>
    <button @click="$router.go(-1)">返回</button>
    <button @click="$router.push('page2')">前进</button>
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
    console.log('page1的', 'beforeRouteEnter')
    if (from.name == 'page2') {
      to.meta.isBack = true;
    }
    next();
  },
  created() {
    console.log('page1的', 'created')
    this.isFirstEnter = true;
  },
  mounted() {
    console.log('page1的', 'mounted')
  },
  activated() {
    console.log('page1的', 'activated')
  },
  deactivated() {
    console.log('page1的', 'deactivated')
  },
  destroyed() {
    console.log('page1的', 'destroyed')
  }
}
</script>

<style scoped lang='less'>
</style>

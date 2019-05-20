<template>
  <div>
    <p>page3</p>
    <p>{{msg}}</p>
    <button @click="$router.go(-1)">返回</button>
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
    console.log('page3的', 'beforeRouteEnter')
    next();
  },
  created() {
    console.log('page3的', 'created')
  },
  mounted() {
    console.log('page3的', 'mounted')
  },
  activated() {
    console.log('page3的', 'activated')
  },
  deactivated() {
    console.log('page3的', 'deactivated')
  },
  destroyed() {
    console.log('page3的', 'destroyed')
  }
}
</script>

<style scoped lang='less'>
</style>

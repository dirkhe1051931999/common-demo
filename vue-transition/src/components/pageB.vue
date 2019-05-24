<template>
  <div>
    <Header
      hasBack
      :title="pageName"
      hasTitle
      hasMenu
    ></Header>
    <div>我是B页面</div>
  </div>
</template>

<script>
let PAGENAME;
export default {
  components: {},
  name: '',
  data() {
    return {
      pageName: PAGENAME
    }
  },
  beforeRouteEnter(to, from, next) {
    // 这样写的目的是当前路由钩子无法访问到this
    PAGENAME = to.meta.name
    next();
  },
  activated() {
    console.log('b', 'activated')
  },
  methods: {

  },

  created() {
    console.log('b', 'create')
  },
  mounted() {

  },
}
</script>

<style scoped lang='less'>
</style>

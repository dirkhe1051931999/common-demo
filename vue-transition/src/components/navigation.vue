<template>
  <div>
    <Header
      hasBack
      :title="pageName"
      hasTitle
      hasMenu
    ></Header>
    <ul>
      <li>
        <router-link to="pageA">pageA</router-link>
      </li>
      <li>
        <router-link to="pageB">pageB</router-link>
      </li>
    </ul>
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
  methods: {

  },
  activated() {
    console.log('navigation', 'activated')
  },
  created() {
    console.log('navigation', 'created')
  },
  mounted() {

  },
}
</script>

<style scoped lang='less'>
li {
  text-align: center;
  padding: 10px;
}
</style>


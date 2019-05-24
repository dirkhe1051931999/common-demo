<template>
  <div>
    <div class="header">
      <span
        class="arrow"
        v-if="hasBack"
        @click="$router.goBack()"
      >返回</span>
      <span
        class="title"
        v-if="hasTitle"
      >{{title}}</span>
      <span
        class="menu"
        v-if="hasMenu"
      >menu</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    hasBack: {
      type: Boolean,
      default: false,
    },
    hasTitle: {
      type: Boolean,
      default: false,
    },
    hasMenu: {
      type: Boolean,
      default: false,
    },
    title: String
  },
  components: {},
  name: '',
  data() {
    return {

    }
  },
  methods: {

  },
  created() {

  },
  mounted() {

  },
}
</script>

<style scoped lang='less'>
.header {
  width: 100%;
  height: 50px;
  background: #e93030;
  color: #fff;
  position: relative;
  .arrow {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translate(0, -50%);
  }
  .title {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .menu {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translate(0, -50%);
  }
}
</style>

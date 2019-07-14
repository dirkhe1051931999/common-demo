<template>
  <div>
    pageA-b
    <div>来自vuex的数据：{{ msg }}</div>
    <Hello></Hello>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  components: {
    Hello: () => import("components/hello")
  },
  computed: {
    ...mapGetters(["msg"])
  },
  methods: {},
  create() {},
  mounted() {}
};
</script>
<style lang='less' scoped>
</style>
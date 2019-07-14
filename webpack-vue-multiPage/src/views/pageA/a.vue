<template>
  <div>
    pageA-a
    <div>来自vuex的数据：{{ msg }}</div>
    <Hello></Hello>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  components: {
    Hello: () => import("components/hello")
  },
  data() {
    return {};
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
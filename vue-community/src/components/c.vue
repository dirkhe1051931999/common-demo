<template>
  <div class=''>
    我是<span class="mine">c</span>、<span
      class="mine"
      @click="cSendD"
    >点我可向d传参</span>有来自a的数据 <span class="data">{{$attrs.a2b2c}}</span>
  </div>
</template>
<script>
import Bus from "@/components/bus.js";
export default {
  components: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    cSendD() {
      Bus.$emit("c-d", "c->d");
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang='css' scoped>
</style>
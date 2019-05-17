<template>
  <div class=''>
    我是<span class="mine">d</span>、来自c的数据 <span class="data">{{c2d}}</span>、来自a的数据 <span class="data">{{a2d}}</span>
  </div>
</template>
<script>
import Bus from "@/components/bus.js";
export default {
  inject: ['a2d'],
  components: {},
  data() {
    return {
      c2d: ""
    };
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {
    Bus.$on("c-d", data => {
      this.c2d = data;
    });
  }
};
</script>
<style lang='css' scoped>
</style>
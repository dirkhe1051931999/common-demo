<template>
  <div class="container">
    共用组件：hello world
    <div>随机数：{{ result }}</div>
    <div class="box"></div>
  </div>
</template>

<script>
import { getRandomInt } from "common/scripts/utils";
export default {
  data() {
    return {
      result: getRandomInt(1, 100)
    };
  },
  components: {},
  computed: {},
  methods: {},
  create() {},
  mounted() {}
};
</script>
<style lang='less' scoped>
.container {
  font-size: 40px;
  text-align: center;
  position: relative;
  .box {
    width: 50px;
    height: 50px;
    left: 30%;
    bottom: 0;
    position: absolute;
    box-sizing: border-box;
    display: flex;
    background: linear-gradient(red, blue);
    box-shadow: 10px 5px 5px goldenrod;
    transform: perspective(500px) translate3d(0, 0, 50px);
    animation: all 0.5s ease;
  }
}
</style>
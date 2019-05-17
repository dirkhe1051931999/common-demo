<template>
  <div class=''>
    我是<span class="mine">b</span>
    有来自a的数据 <span class="data">{{a2b}}、</span>、</span>
    有来自a中用ref传的数据 <span class="data">{{ref_a2b}}</span>、<span
      class="mine"
      @click="bSendA"
    >点我可向a传参</span>
    <p>->>两个兄弟节点</p>
    <C v-bind="$attrs" ></C>
    <D></D>
  </div>
</template>
<script>
import C from "@/components/c";
import D from "@/components/d";
export default {
  // inheritAttrs:false，不会把未被注册的 prop 呈现为普通的 HTML 属性 ，也就是:prop="data"  prop不会作为html的新属性
  inheritAttrs: false,
  props: {
    a2b: String
  },
  components: {
    C,
    D
  },
  data() {
    return {
      ref_a2b:""
    };
  },
  computed: {},
  watch: {},
  methods: {
    bSendA() {
      this.$emit("bSendA", "b->a");
    },
    aSendB(data){
      this.ref_a2b = data;
    }
  },
  created() {},
  mounted() {
    this.$emit('click')
  }
};
</script>
<style lang='css' scoped>
</style>
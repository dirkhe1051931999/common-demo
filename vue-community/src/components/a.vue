<template>
  <div class=''>
    我是<span class="mine">a</span>、来自b的数据 <span class="data">{{b2a}}</span>来自b listener的数据 <span class="data">{{blistena}}</span>
    <B
      :a2b="a2b"
      :a2b2c="`a->c`"
      @bSendA="bSendA"
      @click="bListenA"
      ref="b"
      v-on="$listeners"
    ></B>
  </div>
</template>
<script>
import B from "@/components/b";
export default {
  // Vue.observable()把传入的引用类型变成响应式数据
  provide: {
    a2d: 'a->d'
  },
  components: {
    B
  },
  data() {
    return {
      a2b: "a->b",
      b2a: "",
      blistena:""
    };
  },
  computed: {},
  watch: {},
  methods: {
    bSendA(data) {
      this.b2a = data;
    },
    bListenA(){
      this.blistena = 'blistena'
    }
  },
  created() {},
  mounted() {
    this.$refs.b.aSendB('ref的a->b');
  }
};
</script>
<style lang='css' scoped>
</style>
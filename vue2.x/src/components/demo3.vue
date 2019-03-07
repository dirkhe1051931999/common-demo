<template>
  <div class=''>
     child的name:{{name}}
    <InnerChild :sex="$attrs.sex" @click="onTest" v-on="$listeners"></InnerChild>
  </div>
</template>
<script>
export default {

  inheritAttrs:false,
  props:{
    name:String,
  },
  components: {
    InnerChild:()=> import("./demo4.vue")
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    onTest(){
      console.log("父级组件的点击事件")
    }
  },
  created() {},
  mounted() {}
};
</script>
<style>
</style>
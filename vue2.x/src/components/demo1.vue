<template>
  <div class=''>
    这就是1
    <!-- 我就是注释，这次我不删除 -->
    <Child :name="name" :sex="sex" @click="onTest"></Child>
  </div>
</template>
<script>
export default {
  components: {
    Child:()=> import("./demo3.vue")
  },
  data() {
    return {
      name:"child",
      sex:"man"
    };
  },
  computed: {},
  watch: {},
  methods: {
    onTest(){
      console.log("顶级组件的点击事件")
    }
  },
  created() {},
  mounted() {}
};
</script>
<style>
</style>
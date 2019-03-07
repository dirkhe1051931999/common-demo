<template>
  <div class=''>
    inner-child的Sex:{{sex}}
    <div @click="test">button</div>
  </div>
</template>
<script>
export default {
  props: {
    sex: String
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    test() {
      this.$emit("click");
    }
  },
  created() {},
  mounted() {}
};
</script>
<style>
</style>
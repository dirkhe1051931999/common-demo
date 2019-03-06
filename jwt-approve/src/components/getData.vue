<template>
  <div>{{msg}}</div>
</template>

<script>
import http from "@/http2/http";
export default {
  components: {},
  name: "",
  data() {
    return {
      msg: "getData"
    };
  },
  methods: {},
  created() {},
  mounted() {
    http.getData().then(
      res => {
        if (res.success == 0) {
          this.msg = res.message;
        }
      },
      err => {
        console.log(err);
      }
    );
  }
};
</script>

<style>
</style>

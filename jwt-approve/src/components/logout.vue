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
      msg: "index"
    };
  },
  methods: {},
  created() {},
  mounted() {
    http.loginOut().then(
      res => {
        if (res.success == 0) {
          this.msg = res.message;
          localStorage.removeItem("HAS_SET_TOKEN")
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

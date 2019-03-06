<template>
  <div>
    <div>{{ msg }}</div>
    <button @click="toLogin">点击登录</button>
  </div>
</template>

<script>
import http from "@/http2/http";
export default {
  name: "login",
  data() {
    return {
      msg: "这是一个登录页"
    };
  },
  methods: {
    toLogin() {
      http.login().then(res => {
        console.log(res);
        if (res.success == 0) {
          this.msg = "登录成功";
          localStorage.setItem("HAS_SET_TOKEN", res.token);
        }
      });
    }
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

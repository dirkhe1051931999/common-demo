<template>
  <div>
    <div class="container">
      <button
        class="button"
        @click="login"
        v-if="!userInfo"
      >去登陆</button>
      <div v-if="userInfo">
        <img
          :src="userInfo.avatar"
          alt=""
          class="avatar"
        >
        <p class="nickName">{{userInfo.userName}}<br>{{userInfo.email}}</p>
        <button
          class="button"
          @click="logout"
        >退出登录</button>
      </div>
      <textarea
        class="text"
        v-if="userInfo"
        ref="input"
      ></textarea>
      <p v-if="!userInfo">未登录</p>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  name: '',
  data() {
    return {
      client_id: "b0fbc6a7d4ff2b320158",
      userInfo: null
    }
  },
  methods: {
    login() {
      location.href = `https://github.com/login/oauth/authorize?client_id=${this.client_id}&redirect_uri=http://127.0.0.1:3000/login&scope=user:email`;
      localStorage.setItem('GITHUB_LOGIN_REDIRECT_URL', `${this.$route.path}?login=true`);
    },
    logout() {
      localStorage.removeItem('GITHUB_LOGIN_GUEST');
      this.$router.push({
        path:"/home"
      })
      location.reload();
    }
  },
  created() {

  },
  mounted() {
    if (this.$route.query.login && this.$route.query.login === 'true') {
      localStorage.removeItem('GITHUB_LOGIN_REDIRECT_URL')
      setTimeout(() => {
        this.$refs.input.focus();
      }, 500);
    }
    let guestStr = localStorage.getItem('GITHUB_LOGIN_GUEST');
    if (guestStr) {
      this.userInfo = JSON.parse(guestStr);
    }
  },
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.container {
  width: 150px;
  margin: 50px auto;
}
img {
  width: 50px;
  height: 50px;
  display: inline-block;
  border: 0;
  vertical-align: middle;
}
p {
  display: inline-block;
  vertical-align: middle;
}
button {
  width: 80px;
  height: 30px;
  display: inline-block;
  vertical-align: middle;
}
.text {
  display: block;
  width: 150px;
  height: 100px;
}
</style>

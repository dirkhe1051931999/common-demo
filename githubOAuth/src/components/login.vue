<template>
  <div>
    正在登录中... 请稍候
  </div>
</template>

<script>
import axios from "axios"
export default {
  components: {},
  name: '',
  data() {
    return {

    }
  },
  methods: {

  },
  created() {

  },
  mounted() {
    if (this.$route.query.code) {
      axios.get(`/api/github?code=${this.$route.query.code}`, {}).then((res) => {
        if (res.data.success === 1) {
          console.log(res)
          let guest = {
            userName: res.data.data.userName,
            avatar: res.data.data.avatar,
            email: res.data.data.email
          };
          localStorage.setItem('GITHUB_LOGIN_GUEST', JSON.stringify(guest))
          let redirectUrl = localStorage.getItem('GITHUB_LOGIN_REDIRECT_URL');
          this.$router.push({ path: redirectUrl })
        }
      })
    }
  },
}
</script>

<style scoped>
</style>

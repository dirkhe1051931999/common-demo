<template>
  <div>
    <transition :name="transitionName">
      <keep-alive v-if="$route.meta.keepAlive">
        <router-view class="page"></router-view>
      </keep-alive>
      <router-view
        class="page"
        v-if="!$route.meta.keepAlive"
      ></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      transitionName: 'slide-left'
    }
  },
  beforeRouteUpdate(to, from, next) {
    let isBack = this.$router.isBack
    if (isBack) {
      this.transitionName = 'slide-right'
    } else {
      this.transitionName = 'slide-left'
    }
    this.$router.isBack = false
    next()
  },
  mounted() { }
}
</script>

<style scoped lang='less'>
.page {
  position: absolute;
  width: 100%;
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 0.8);
}
.slide-left-enter,
.slide-right-leave-active {
  -webkit-transform: translate(100%, 0);
  transform: translate(100%, 0);
}
.slide-left-leave-active,
.slide-right-enter {
  -webkit-transform: translate(-100%, 0);
  transform: translate(-100% 0);
}
</style>

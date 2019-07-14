<template>
  <div class="page">
    <div>pageB</div>
    <button @click="$router.push('/a')">a</button>
    <button @click="$router.push('/b')">b</button>
    <router-view></router-view>
  </div>
</template>
<style lang='less'>
.page {
  padding: 40px 100px;
  text-align: center;
}
</style>
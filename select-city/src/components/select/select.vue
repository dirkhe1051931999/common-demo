<template lang="html">
<!-- <transition name="slide"> -->
  <div>
    <div @click="city" class="city clearfix">
      <i>所在城市</i>
      <em></em>
      <span>{{selCity}}</span>
      
    </div>
    <div @click="community" class="community clearfix">
      <i>小区名称</i>
      <em></em>
      <span>{{selCommunity}}</span>
    </div>
  </div>
<!-- </transition> -->
</template>

<script>
import {mapGetters} from "vuex"
import {changeTitle} from "common/js/dom.js"
export default {
  computed:{
    selCity(){
        return this.selectCity
    },
    selCommunity(){
        return this.selectCommunity
    },
    ...mapGetters([
      'selectCity',
      'selectCommunity'
    ])
  },
  methods:{
    city(){
      this.$router.push({
        path:`/city`
      })
    },
    community(){
      this.$router.push({
        path:`/search`
      })
    }
  },
  mounted(){
    changeTitle("我的小区");
  }
}
</script>

<style lang="less" scoped>
@import "../../common/less/mixin.less";
.city,.community{
  color: #666;
  font-size: .28rem;
  background: #fff;
  height:.98rem;
  line-height: .98rem;
  padding: 0 .3rem;
  border-bottom: 1px solid #f6f4f4;
  span{
    float: right;
  }
  i{
    float: left;
  }
  em{
    .bgimg("../../common/img/icon_arrow2.png");
    display: inline-block;
    width: .12rem;
    height:.22rem;
    float:right;
    margin-top: .4rem;
    margin-left: .2rem;
  }
}
// .slide-enter-active, .slide-leave-active{
//   transition: all 0.3s
// }
// .slide-enter, .slide-leave-to {
//   transform: translate3d(100%, 0, 0)
// }
</style>

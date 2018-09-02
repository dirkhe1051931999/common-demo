<template lang="html">
  <Scroll class="citylist" :data="city" ref="cityList" :listenScroll="listenScroll" @scroll="scroll" :probetype="probetype">
  <div>
    <div v-for="(item,index) in city" class="allCity" ref="listGroup">
      <h2>{{item.initial}}</h2>
      <ul>
        <li v-for="city in item.list" @click="selectItem(city)">
            {{city.name}}
        </li>
      </ul>
    </div>
  </div>
  <div class="list-shortcut" @touchstart="onShortcutTouchStart">
    <ul>
      <li class="starCity"></li>
      <li v-for="(item,index) in city" class="item"  :data-index="index">
        {{item.initial}}
      </li>
    </ul>
  </div>
  <div class="list-fixed" v-show="fixedTitle" ref="fixed">
      <h1 class="fixed-title">{{fixedTitle}}</h1>
  </div>
  </Scroll>
</template>

<script>
import Scroll from "base/m-scroll/scroll"
import {citylist} from "common/js/city"
import {getData} from 'common/js/dom'
const TITLE_HEIGHT= 20
export default {
  components:{
    Scroll
  },
  data(){
    return{
      city:[],
      scrollY: -1,
      currentIndex:0,
      diff:-1,
    }
  },
  created(){
    this.touch = {};
    this.listenScroll = true;
    this.listenHeight = [];
    this.probetype = 3;
  },
  computed:{
    fixedTitle(){
      if (this.scrollY>0) {
        return ""
      }
      return this.city[this.currentIndex]?this.city[this.currentIndex].initial:""
    }
  },
  mounted(){
    this.city = citylist
  },
  methods:{
    scroll(pos){
      this.scrollY = pos.y;
    },
    onShortcutTouchStart(e){
      let anchorIndex = getData(e.target,'index');
      console.log(anchorIndex);
      let firstTouch = e.touches[0];
      this.touch.y1 = firstTouch.pageY;
      this.touch.anchorIndex = anchorIndex;
      // this.$refs.singerlist.scrollToElement(this.$refs.listGroup[anchorIndex],0);
      this._scrollTo(anchorIndex)
    },
    _scrollTo(index){
      if (!index && index!=0) {
        return
      }
      // 点击右边字母跳到指定位置并高亮
      this.scrollY = -this.listenHeight[index]-1;
      this.$refs.cityList.scrollToElement(this.$refs.listGroup[index],0);
    },
    _calculateHeight(){
      this.listenHeight = [];
      const list = this.$refs.listGroup;
      let height = 0;
      this.listenHeight.push(height);
      for(let i =0;i<list.length;i++){
        let item = list[i];
        height +=item.clientHeight;
        this.listenHeight.push(height);
      }
    },
    selectItem(item){
      this.$emit("selectItem",item);
    }
  },
  watch:{
    city(){
      setTimeout(()=>{
        this._calculateHeight()
      },20)
    },
    scrollY(newY){
      // 滚动到中间部分
      const listenHeight = this.listenHeight;
      // 滚动到头部以上
      if (newY>=-25) {
        this.currentIndex = 0;
        return;
      }
      for(let i=0;i<listenHeight.length-1;i++){
        let height1 = listenHeight[i];
        let height2 = listenHeight[i+1];
        // 如果没在下限，且在height1和height2之间
        if (-newY>=height1 && -newY<=height2) {
          this.currentIndex = i;
          this.diff = height2 + newY;
          return;
        }
      }
    },
    diff(newVal){
      let fixedTop = (newVal>0 && newVal<TITLE_HEIGHT)?newVal-TITLE_HEIGHT:0;
      if (this.fixedTop === fixedTop) {
        return
      }
      this.fixedTop = fixedTop;
      this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
    }
  }
}
</script>
<style lang="less" scoped>
.citylist{
  position: fixed;
  top: 2.3rem;
  width: 100%;
  bottom: 0;
  overflow: hidden;
  background: #fff;
  // padding-top: .45rem;
  .allCity{
    ul{
      li{
        font-size:.28rem;
        color:#323232;
        width: 6.56rem;
        margin: 0 auto;
        height: .82rem;
        line-height: .82rem;
        border-bottom: 1px solid #f6f4f4;
      }
    }    
    h2{
      background:#f6f4f4;
      padding-left: .34rem;
    }
  }
  .list-shortcut{
    position: fixed;
    z-index: 30;
    right: .1rem;
    top: 50%;
    transform: translateY(-50%);
    width: .3rem;
    border-radius: .1rem;
    text-align: center;
    .item{
      padding: .04rem 0;
      line-height:1;
    }
    // .starCity{
    //   width: 0.12rem;
    //   height: 0.12rem;
    //   display: inline-block;
    //   background-size: cover;
    //   background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAGXRFW…2Koxi5BpUDOWgbKRZ8h5YjPkB8jojIPQvNnLbY4gcgwAAXbkHtR5mBDgAAAABJRU5ErkJggg==)
    // }
  }
  .list-fixed{
    background:#f6f4f4;
    z-index: 30;
    position: absolute;
    top: -2px;
    left:0;
    width: 100%;
    .fixed-title{
      height:.4rem;
      line-height:.4rem;
      padding-left:.34rem;
    }
  }
}
</style>

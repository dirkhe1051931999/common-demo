<template lang="html">
  <transition name="slide">
    <div class="xin-widget-citys animated">
        <SearchBox class="search" @query="query" :placeholder="placeholder"></SearchBox>
        <Scroll :data="searchList" class="searchlist" v-if="queryCity !== ''" :class="{'bg':searchList.length === 0}">
            <div>
              <ul v-if="searchList.length!==0">
                  <li v-for="item in searchList" @click="selectSearchItem(item)">{{item}}</li>
              </ul>
                <img v-else src="../../common/img/404.png" class="nomatch"/>
            </div>
        </Scroll>
    </div>
  </transition>
</template>

<script>
import SearchBox from "base/m-search-box/search-box"
import Scroll from "base/m-scroll/scroll"
import {getSearchData} from "api/search"
import {mapMutations,mapGetters} from "vuex"
import {changeTitle} from "common/js/dom.js"
export default {
  data(){
    return{
      queryCity:"",
      placeholder:"输入小区名称",
      searchList:[],//搜素结果
    }
  },
  components:{
    SearchBox,
    Scroll
  },
  computed:{
    id(){
      return this.hasSelCityID;
    },
    ...mapGetters([
      'hasSelCityID',
    ])
  },
  methods:{
    query(newVal){
      this._search(newVal);
      this.queryCity = newVal;
    },
    _search(newVal){
      this._getDiscList(newVal,this.id);
    },
    _getDiscList(key,id){
      this.searchList=["八方城","西溪北苑北区","西溪北苑西区","西溪北苑东区","万科城","恒大城","西溪科技园","未来科技城","智慧城","春天家园","茶张新苑","双水磨小区","小区1","小区2","小区3","小区4","小区5","小区6","小区7"];
      getSearchData(key,id).then((res)=>{
        // if(res.code===ERR_OK){
          // console.log(res.data.v_hot);
            // this.discList = res.data.v_hot;
        // }
      },(err)=>{})
    },
    selectSearchItem(item){
      this.$router.back();
      this.setCommuinty(item);
    },
    ...mapMutations({
      setCommuinty:"SET_COMMUNITY"
    })
  },
  mounted(){
    changeTitle("楼盘/小区");
  }
}
</script>

<style lang="less" scoped>
.xin-widget-citys{
  padding-top: .14rem;
  padding-bottom: .4rem;
  background: #fff;
  .searchlist{
    position: fixed;
    top: 1rem;
    width: 100%;
    bottom: 0;
    overflow: hidden;
    background:#fff;
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
    .nomatch{
      display: block;
      margin:0 auto;
      margin-top:2.04rem;
      width:2.09rem;
      height:1.95rem;
    } 
  }
  .bg{
    background:#f6f4f4;
  }
}
.slide-enter-active, .slide-leave-active{
  transition: all 0.3s
}
.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0)
}
</style>

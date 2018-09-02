<template lang="html">
<transition name="slide">
  <div class="xin-widget-citys animated">
    <SearchBox class="search" @query="query" :placeholder="placeholder"></SearchBox>
    <div class="currentCity" v-if="queryCity===''">
      <ul>
        <h2>当前定位城市</h2>
        <li>杭州</li>
      </ul>
    </div>
    <Scroll :data="searchList" class="searchlist" v-if="queryCity !== ''" :class="{'bg':searchList.length === 0}">
        <div>
          <ul v-if="searchList.length!==0">
              <li class="bdb" v-for="item in searchList" @click="selectSearchItem(item)">{{item.name}}</li>
          </ul>
            <img v-else src="../../common/img/404.png" class="nomatch"/>
        </div>
    </Scroll>
    <CityList class="city" v-if="queryCity===''" @selectItem="selectItem"></CityList>
  </div>
</transition>
</template>

<script>
import Scroll from "base/m-scroll/scroll"
import SearchBox from "base/m-search-box/search-box"
import {citylist} from "common/js/city"
import CityList from "base/city-list/city-list"
import {changeTitle} from "common/js/dom.js"
import {mapMutations} from "vuex"
export default {
  components:{
    SearchBox,
    CityList,
    Scroll
  },
  data(){
    return{
      city:[],
      letterList:[],
      searchList: [], //搜索结果
      queryCity:"",
      placeholder:"输入城市名称"
    }
  },
  methods:{
    hide(){
      this.$router.back();
    },
    query(newVal){
      this._search(newVal);
      this.queryCity = newVal;
    },
    // 搜索
    _search(newVal){
        var reg = new RegExp(newVal == '' ? 'xxyy' :newVal, 'ig');
        var _arr = [];
        for(var i in this.letterList){
            for(var j = 0; j < this.letterList[i].length; j++){
                if(
                    reg.test(this.letterList[i][j][
                        'name'
                    ]) ||
                    reg.test(this.letterList[i][j][
                        'firstLetter'
                    ])
                ){
                    _arr.push(this.letterList[i][j]);
                }
            }
        }
        this.searchList = _arr;
    },
    // 序列化数组
    _formatCityList(arr){
      var letterArr = {};
      for (var i = 0; i < arr.length; i++) {
        if (!(arr[i]['initial'] in letterArr)) {
          letterArr[arr[i]['initial']] = [];
          for(var j=0;j<arr[i].list.length;j++){
            letterArr[arr[i]['initial']].push(arr[i].list[j]);
          }
        }else{
         for(var j=0;j<arr[i].list.length;j++){
            letterArr[arr[i]['initial']].push(arr[i].list[j]);
          }
        }
      }
      this.letterList = letterArr;
    },
    // 给数组添首字母
    _addFirstLetter(citylist){
      for(var i=0;i<citylist.length;i++){
        for(var j=0;j<citylist[i].list.length;j++){
          citylist[i].list[j]['firstLetter'] = citylist[i].initial;
        }
      }
      this._formatCityList(citylist);
    },
    selectItem(item){
      this.afterSelect(item)
    },
    selectSearchItem(item){
      this.afterSelect(item)
    },
    // 选择之后的操作
    afterSelect(item){
      this.$router.back();
      this.setCity(item.name);
      this.setCityId(item.zip);
    },
    ...mapMutations({
      setCity:"SET_CITY",
      setCityId:"SET_CITYID"
    })
  },
  mounted(){
    this._addFirstLetter(citylist)
    changeTitle("选择城市");
  }

}
</script>

<style lang="less" scoped>
.xin-widget-citys{
  background:#fff;
  padding-top: .14rem;
  padding-bottom: .40rem;
  .currentCity{
    width: 6.56rem;
    margin: 0 auto;
    ul{
      h2{
        font-size: .28rem;
        color:#999;
        margin-bottom: .22rem;
        margin-top:.32rem;
      }
      li{
        font-size:.28rem;
        color:#323232;
      }
    }
  }
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

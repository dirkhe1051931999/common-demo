<template>
  <div class="search-box">
    <i class="icon-search"></i>
    <input ref="query"  class="box" :placeholder="placeholder" v-model="query"/>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
   props:{
    placeholder:{
      type:String,
      default:"输入城市名字"
    }
   },
   data(){
    return{
      query:''
    }
   },
   methods:{
    clear(){
      this.query = "";
    },
    setQuery(query){
      this.query = query;
    }
   },
   // 把用户输入的内容以watch的形式暴露出去
   // query变化就去派发一个事件
   created(){
    this.$watch('query',(newQuery)=>{
      this.$emit('query',newQuery)
    })
   }
  }
</script>

<style scoped lang="less">
@import "../../common/less/mixin.less";
.search-box{
  width: 6.56rem;
  height: .56rem;
  font-size: .28rem;
  color:#999;
  margin: 0 auto;
  background:#eee;
  border-radius: .04rem;
  .icon-search{
    margin-left: .18rem;
    height:.28rem;
    width:.28rem;
    .bgimg("../../common/img/icon_search.png");
    display: inline-block;
  }
  .box{
    font-size:.28rem;
    background:#eee;
    display:inline-block;
    border: 0;
    color:#999;
    width:6rem;
    height: 100%;
    vertical-align: .05rem;
    // &::placeholder{
    //    color: #999;
    // }   
  }
} 
</style>

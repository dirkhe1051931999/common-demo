<template lang='pug'>
  .sale-wrap
    .wrap(v-for="(item,index) in recommend" :key="Math.random()")
      .sale-item
        .title-wrap
          .titleIcon 新歌推荐
          .more-benift
        .content
          .item(v-for="(rec,idx) in item" :key="Math.random()")
            img(:src="rec.imgUrl" width="100%")
            .title {{rec.title}}
            .price-wrap
              span.price_down {{rec.price_down}}
</template>

<script lang='ts'>
import { Prop, Vue, Component } from "vue-property-decorator";
import recommend from "common/mock/recommend.js";
@Component
export default class Supersale extends Vue {
  recommend: Array<any> = recommend.list;
  mounted() {
    console.log(this.recommend);
  }
}
</script>
<style scoped lang='less'>
.sale-item {
  padding: 0 5px;
  .title-wrap {
    height: 32px;
    line-height: 32px;
    padding: 5px 0;
  }
  .titleIcon {
    color: #31c27c;
    display: inline-block;
    height: 30px;
    width: 75px;
  }
  .content {
    display: flex;
    justify-content: center;
    box-sizing: border-box;
    overflow: hidden;

    .item {
      display: block;
      width: 33%;
      padding: 0 2px;
      box-sizing: border-box;
      border-radius: 3px;

      .title {
        color: #333;
        font-size: 14px;
        padding-top: 3px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .price-wrap {
        position: relative;
        .price_down {
          font-size: 14px;
          color: #999;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          height: 22px;
        }
      }
    }
  }
}
</style>

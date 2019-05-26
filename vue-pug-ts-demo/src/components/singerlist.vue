<template lang='pug'>
  .list-wrap
    .head 流行榜
    ul
      li.topic_item(v-for="(item,index) in singerlist" :key="Math.random()")
        .topic_main
          .topic_media
            img(:src="item.imgUrl" width="100px" height="100px")
            .tag {{item.listenCount>10000000?'热':'推荐'}}
          .topic_info
            .topic_cont
              h3.topic_title {{item.topTitle}}
              p.song(v-for="(song,idx) in item.songList") 
                span {{idx}}
                span.text_name {{song.songname}}
                span {{song.singername}}
</template>

<script lang='ts'>
import { Prop, Vue, Component } from "vue-property-decorator";
import singerlist from "common/mock/singerlist.js";
@Component
export default class Shoplist extends Vue {
  singerlist: Array<any> = singerlist.list;
  mounted() {
    console.log(this.singerlist);
  }
}
</script>
<style scoped lang='less'>
.list-wrap {
  .head {
    padding-left: 15px;
    font-size: 18px;
    color: #31c27c;
    padding: 10px;
  }
  ul {
    margin: 0;
    padding: 0;
    li {
      margin-bottom: 10px;
      overflow: hidden;
      list-style: none;
      display: list-item;
      text-align: -webkit-match-parent;
      .topic_main {
        display: -webkit-box;
        background: #fff;
        .topic_media {
          position: relative;
          width: 100px;
          height: 100px;
          display: block;
          img {
            display: block;
            width: 100px;
            height: 100px;
          }
          .tag {
            position: absolute;
            display: block;
            left: 5px;
            bottom: 7px;
            line-height: 12px;
            color: #fff;
            opacity: 0.6;
            font-size: 9px;
            z-index: 10;
          }
        }
        .topic_info {
          position: relative;
          -webkit-box-flex: 1;
          display: -webkit-box;
          -webkit-box-align: center;
          -webkit-box-pack: center;
          .topic_cont {
            -webkit-box-flex: 1;
            margin: 0 10px 0 15px;
          }
          .topic_title {
            margin: 0;
            font-size: 16px;
            color: #000;
            font-weight: 400;
            margin-bottom: 5px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .song {
            margin: 0;
            font-size: 14px;
            color: rgba(0, 0, 0, 0.5);
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            .text_name {
              color: #000;
              margin-left: 8px;
              margin-right: 5px;
            }
          }
        }
      }
    }
  }
}
</style>

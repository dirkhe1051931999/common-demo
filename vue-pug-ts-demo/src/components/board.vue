<template lang='pug'>
  .board-wrap
    .wrap(v-for="(item,index) in board" :key="index")
      .board
        .item(v-for="(board,idx) in item" :key="idx")
          .cnt
            .title {{board.title}} 
            .desc {{board.desc}}
          img(:src="board.imgUrl")
</template>

<script lang='ts'>
import {
  Component,
  Emit,
  Inject,
  Model,
  Prop,
  Provide,
  Vue,
  Watch
} from "vue-property-decorator";
import board from "common/mock/board.js";
@Component
export default class Board extends Vue {
  board: Array<any> = board.list;
  mounted() {
    console.log(this.board);
  }
}
</script>
<style scoped lang='less'>
.board-wrap {
  .board {
    display: flex;
    align-items: center;
    .item {
      display: flex;
      flex: 1;
      align-items: center;
      padding: 10px;
      .cnt {
        flex: 1;
        .title {
          font-size: 16px;
        }
        .desc {
          font-size: 12px;
          color: #999;
          margin-top: 5px;
        }
      }
      img {
        height: 60px;
        width: 60px;
      }
    }
  }
  .wrap:nth-child(2) {
    .item:first-child {
      border-right: 1px solid #f1f1f1;
    }
  }
  .wrap:nth-child(3) {
    .item {
      background-color: #ffa383;
      color: white;
      margin-right: 5px;
      .desc {
        width: 75px;
        padding: 2px;
        border-radius: 12px;
        background-color: #f97e54;
        transform: scale(0.9);
        color: #e6e6e6;
        text-align: center;
      }
    }
    .item:last-child {
      background-color: #44d0cd;
      margin: 0;
      .desc {
        background-color: #22bab7;
      }
    }
  }
}
</style>

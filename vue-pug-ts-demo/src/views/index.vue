<template lang="pug">
  .main-wrapper
    HeaderBox
    .content-wrapper
      SwiperBox
      div(v-if="true")
        Board
        Recommend
        Singerlist
</template>

<script lang="ts">
import HeaderBox from "components/headerbox.vue";
import SwiperBox from "components/swiperbox.vue";
import Board from "components/board.vue";
import Recommend from "components/recommend.vue";
import Singerlist from "components/singerlist.vue";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  components: {
    HeaderBox,
    SwiperBox,
    Board,
    Recommend,
    Singerlist
  }
})
export default class App extends Vue {}
</script>
<style lang="less" scoped>
.content-wrapper {
  padding-top: 50px;
}
</style>


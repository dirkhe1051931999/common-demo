<template lang="pug">
  swiper.swiperBox(:option="swiperOption")
    swiper-slide.page(v-for="(item,index) in modules" :key="index")
      img(:src="item.imgUrl" :alt="item.name")
    .swiper-pagination(slot="pagination")
</template>
<script lang="ts">
import { Prop, Vue, Component } from "vue-property-decorator";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
import slides from "common/mock/slides.js";

@Component({
  components: {
    swiper,
    swiperSlide
  }
})
export default class swiperBox extends Vue {
  modules: Array<any> = slides.list;
  mounted() {
    console.log(this.modules);
  }
  private swiperOption: Object = {
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    }
  };
}
</script>
<style lang="less" scoped>
.swiperBox {
  padding-bottom: 25px;
  .page {
    img{
      width: 100%;
      height: 100%;
    }
  }
  .swiper-pagination {
    bottom: 3px;
    span {
      background: #f5734b;
    }
  }
}
</style>

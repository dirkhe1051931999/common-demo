<template lang="pug">
  .headerBox
    .city 杭州
    .search-wrap(ref="search" )
      span(ref="placeholder" v-if="!searchValue") 输入你喜欢的爱豆~
      input(v-model="searchValue" ref="input" @fucus="onfocus" @blur="onBlur" @input="onValueChange")
    .user
      .icon
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
@Component
export default class headerBox extends Vue {
  searchValue: string = "";
  mounted() {
    this.onChangeSize();
  }
  onChangeSize(): void {
    window.addEventListener("scroll", (e: any) => {
      const TRANS_HEIGHT: number = 10;
      const MAX_WIDTH: string = "90%";
      const scrollY: number = window.scrollY;
      const el_search: any = this.$refs.search;
      const input: any = this.$refs.input;
      if (!el_search) {
        return;
      }
      input && input.blur();
      if (scrollY > TRANS_HEIGHT) {
        el_search.style.width = MAX_WIDTH;
      } else {
        el_search.removeAttribute("style");
      }
    });
  }
  onfocus(): void {
    const TRANS_X: string = "translateX(15px)";
    const LEFT: string = "0";
    const placeholder: any = this.$refs.placeholder;
    if (!placeholder) {
      return;
    }
    placeholder.style.left = LEFT;
    placeholder.style.transform = TRANS_X;
  }
  onBlur(): void {
    const placeholder: any = this.$refs.placeholder;
    if (placeholder) {
      placeholder.removeAttribute("style");
    }
  }
  onValueChange(): void {
    const val: string = this.searchValue;
    alert('嘻嘻，还没做~')
  }
}
</script>
<style lang="less" scoped>
.headerBox {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  height: 50px;
  line-height: 50px;
  background-color: #31c27c;
  color: #ffffff;
  text-align: center;
  z-index: 9;
  .city {
    position: relative;
    width: 20%;
  }
  .search-wrap {
    position: absolute;
    width: 60%;
    left: 0;
    right: 0;
    top: 10px;
    margin: auto;
    height: 30px;
    line-height: 30px;
    color: #cccccc;
    border-radius: 25px;
    background-color: #fff;
    transition: width 0.1s ease;
    span {
      display: inline-block;
      position: absolute;
      width: 100%;
      left: 50%;
      transform: translateX(-50%);
      transition: all 0.2s ease;
    }
    input {
      position: absolute;
      left: 15px;
      padding: 0;
      margin: 0;
      width: 100%;
      color: #999;
      background: none;
      border: none;
      height: 30px;
      outline: none;
      caret-color: #31c27c;
    }
  }
  .user {
    position: absolute;
    right: 0;
    width: 20%;
    z-index: 99;
    height: 50px;
    .icon {
      background-image: url("//www.dpfile.com/app/app-m-module/static/d53930bbff0bf22cb8cea72503da44d9.png");
      background-repeat: no-repeat;
      background-position: left -67px;
      background-size: 250px;
      width: 28px;
      height: 100%;
      margin: 0 auto;
    }
  }
}
</style>


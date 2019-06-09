<template>
  <div>
    <img src="../assets/banner.png" class="banner"></img>
    <h1>猜你喜欢</h1>
    <div class="list" v-for="item in food">
      <div class="left">
        <img :src="item.img" alt="">
      </div>
      <div class="right">
        <p>{{item.name}}</p>
        <p>{{item.voucher}}</p>
        <p>{{item.price}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      food: [
        {
          name: "沪小二炭火蛙锅",
          img:
            "//p1.meituan.net/200.0/deal/fb4b162a52cdca47e0f592459a292b4a71195.jpg@133_0_533_533a%7C267h_267w_2e_90Q",
          voucher: "[杭州等]100元代金券1张，可叠加",
          price: "88元"
        },
        {
          name: "苑苑形象设计",
          img:
            "//p0.meituan.net/200.0/dpdeal/ce56d11585bd6b541d3060af5841c117196668.jpg",
          voucher: "[杭州等][店铺推荐]总监剪发+造型",
          price: "102元"
        },
        {
          name: "锅内锅外",
          img:
            "//p1.meituan.net/200.0/deal/caffa7440cac3a82555ec5791ace77ef21445.jpg@205_0_300_300a%7C267h_267w_2e_90Q",
          voucher: "[2店通用]自助晚餐",
          price: "86元"
        }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
h1 {
  font-size: 16px;
  padding: 5px;
}
.banner {
  width: 100%;
  height: 200px;
  display: block;
}
.list {
  padding: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  .left {
    width: 30%;
  }
  .right {
    width: 70%;
    p {
      line-height: 32px;
    }
  }
  img {
    width: 90px;
    height: 90px;
    display: inline-block;
  }
}
</style>

<template>
  <div>
    <button
      @click="showBox"
      class="btn-primary btn-confirm"
    >删除</button>
    <ul v-for="item in arr">
      <li>{{item}}</li>
    </ul>
    <pagination
      :page-size="pageSize"
      :total="total"
      :current-page="page"
      @change-page="changePage"
    >
    </pagination>
  </div>
</template>

<script>


export default {
  components: {
    Pagination: () => import("../components/pagination")
  },
  name: '',
  data() {
    return {
      pageSize: 5,
      total: 10,
      page: 1,
      origins: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      arr: [],
      currentCat: {
        id: 0,
        name: '全部分类',
        count: 0
      },
    }
  },
  methods: {
    changePage: function (newPage) {
      this.page = newPage;
      let start = 5 * (this.page - 1);
      let end = 5 * (this.page)
      console.log(start, end);
      this.arr = this.origins.slice(start, end);
    },
    showBox() {
      this.$msgBox.showMsgBox({
        title: '删除提示',
        content: '当前分类下存在文章，不允许删除该分类！'
      }).then(() => {
        return false;
      }).catch(() => {
        return false;
      });
    }
  },
  created() {

  },
  mounted() {
    this.arr = this.origins.slice(0, this.pageSize);
  },
}
</script>

<style scoped lang='less'>
</style>

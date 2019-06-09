<template>
  <skeleton>
    <!-- 第一行 -->
    <skeleton-row padding="15px 10px 0 ">
      <!--3段共占一行，均匀排列每个元素，收个元素在起点，末尾元素在终点，类似flex的space-between-->
      <skeleton-square width="200px" />
      <skeleton-square width="50px" margin="0 0 0 40px" />
      <skeleton-square width="50px" margin="0 0 0 10px" />
    </skeleton-row>
    <!-- 第二行 -->
    <skeleton-row padding="20px 10px">
      <!-- 左边是圆，直径是50px -->
      <skeleton-circle diameter="50px" />
      <!-- 右边是3小段，垂直排列-->
      <skeleton-square width="275px" :count="3" margin="5px 10px 5px 10px" />
    </skeleton-row>
    <!-- 第三行 -->
    <skeleton-row padding="0 10px 20px">
      <!-- 左边是圆，直径是50px -->
      <skeleton-circle diameter="50px" />
      <!-- 右边是列-->
      <skeleton-column>
        <!-- 列的前两行等宽 -->
        <skeleton-square width="275px" :count="2" margin="5px 10px 5px 10px" />
        <!-- 最后一行是第一二行的一半 -->
        <skeleton-square width="137.5px" margin="5px 10px 5px 10px" />
      </skeleton-column>
    </skeleton-row>
    <!-- 第四行 -->
    <skeleton-row padding="0 10px 20px">
      <!-- 左边是正方形，宽高都是75px -->
      <skeleton-square width="75px" height="75px" />
      <!-- 右边是列 -->
      <skeleton-column padding="0 0 0 10px">
        <!--列第一行独占一行-->
        <skeleton-square width="275px" height="10px" margin="0 10px 5px 10px" />
        <!-- 第二行短一点 -->
        <skeleton-square
          width="100px"
          height="7.5px"
          margin="5px 10px 5px 10px"
        />
        <!--第三行是自定义的颜色-->
        <skeleton-square width="275px" backColor="#e93030" :count="2" />
        <!-- 第四行 -->
        <skeleton-square width="50px" margin="0 10px 5px 10px" />
      </skeleton-column>
    </skeleton-row>
    <!-- 第五行-->
    <skeleton-row padding="0 10px 20px">
      <!-- 四个正方形 均匀分布于一行 -->
      <skeleton-square
        v-for="i in 5"
        :key="i"
        width="30px"
        height="30px"
        margin="15px"
      />
    </skeleton-row>
  </skeleton>
</template>

<script>
export default {};
</script>
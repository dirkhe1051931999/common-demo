<template>
  <skeleton>
    <!-- 第一行 -->
    <skeleton-row padding="10px">
      <skeleton-square width="355px" height="200px" />
    </skeleton-row>
    <!-- 第二行 -->
    <skeleton-row padding="10px" v-for="(item, index) in 3" :key="index">
      <skeleton-square width="90px" height="90px" />
      <skeleton-column>
        <skeleton-square width="255px" :count="2" margin="5px" />
        <skeleton-square width="127.5px" margin="5px" />
      </skeleton-column>
    </skeleton-row>
  </skeleton>
</template>

<script>
export default {};
</script>
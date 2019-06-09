<template>
  <div class="vue-skeleton-loading">
    <div class="skeleton-bac-animation"></div>
    <div class="skeleton-bac-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'skeleton',
};
</script>

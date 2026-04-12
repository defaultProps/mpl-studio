<template>
  <div class="list-group nested-sortable">
    <div class="list-group-item" />
  </div>
</template>
<script setup lang="ts">

</script>
<style lang="less" scoped>

  ul,u
  li {
    list-style: none;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-inline-start: 0;
    box-sizing: border-box;

    >ul {
      padding-left: 15px;

    }

    div {
      width: 100%;
      height: 20px;
      line-height: 20px;
    }
  }

</style>
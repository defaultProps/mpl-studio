<script lang="ts" setup>
import OperationBanner from './operationBanner.vue'
</script>

<template>
  <main class="workbench-box">
    <section class="workbench-container">
      <OperationBanner />
    </section>
  </main>
</template>

<style lang="less">
  .workbench--container::-webkit-scrollbar-track-piece,
  .workbench--container::-webkit-scrollbar-corner,
  .workbench--container::-webkit-scrollbar-track,
  .workbench--container::-webkit-scrollbar-button {
    background-color: transparent;
    opacity: 0;
  }
  .level-component--box .el-breadcrumb {
    font-size: 12px;
    line-height: normal;
    .el-breadcrumb__inner {
      cursor: default;
    }
    .el-breadcrumb__item:nth-child(1),
    .el-breadcrumb__item:nth-child(2),
    .el-breadcrumb__item:nth-child(3) {
      .el-breadcrumb__inner {
        color: #909399;
      }
    }
  }
</style>

<style lang="less" scoped>
  main.workbench-box {
    width: 100%;
    height: calc(100% - 30px);
    display: flow-root;
    section.workbench-container {
      height: 100%;
      overflow: hidden;
      width: 100%;
      display: flex;
    }
  }
</style>

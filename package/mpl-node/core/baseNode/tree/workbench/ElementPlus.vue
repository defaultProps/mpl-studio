<script lang="ts" setup>
import { ref } from 'vue'

const rowData = ref<any>([
  { date: 'Toyota', name: 'Celica', address: 35000 },
  { date: 'Ford', name: 'Mondeo', address: 32000 },
  { date: 'Porsche', name: 'Boxster', address: 72000 },
])
</script>

<template>
  <div class="mpl-table">
    <el-table
      :data="rowData"
      style="width: 100%"
      :resizable="false"
    >
      <el-table-column
        prop="date"
        label="Date"
        width="180"
      />
      <el-table-column
        prop="name"
        label="Name"
        width="180"
      />
      <el-table-column
        prop="address"
        label="Address"
      />
    </el-table>
    <!-- 遮罩层 - 禁止操作表格 -->
    <div class="mask-table-workbench" />
  </div>
</template>

<style lang="less" scoped>
  .mpl-table {
    width: 100%;
    height: 100%;
    position: relative;
    .mask-table-workbench {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 2;
      background-color: transparent;
    }
  }
</style>

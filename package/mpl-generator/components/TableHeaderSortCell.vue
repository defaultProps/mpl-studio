<template>
  <div class="mpl-table-header-sort-cell" :title="label">
    <div class="mpl-table-header-sort-cell-text">
      {{ label }}
    </div>
    <div class="mpl-table-header-sort-cell-icon">
      <i class="icon-sort" />
      {{ index }}
    </div>
  </div>
</template>
<!-- 表头字段， 支持多表头排序，显示排序字段数量 -->
<script lang="ts" setup>
const props = defineProps<{ label: string, isWorkbench: boolean, prop: string, index: number }>()
</script>
<style lang="less" scoped>
.mpl-table-header-sort-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #131313;
  .mpl-table-header-sort-cell-text {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .mpl-table-header-sort-cell-icon {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: fit-content;
  }
}
</style>
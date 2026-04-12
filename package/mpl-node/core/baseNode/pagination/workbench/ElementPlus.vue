<script lang="ts" setup>
import { ref, watch } from 'vue'
import { Pagination } from '../define'

// 分页跳转最多展示5条。 total > pageSize * 5

const props = defineProps<{ node: Pagination }>()
const pagination = ref<Pagination>(props.node)
const rateValue = ref<number>(props.node.model)

watch(
  () => props.node.model,
  (value: number) => {
    rateValue.value = value
  }
)
</script>

<template>
  <div class="mpl-pagination">
    <div class="mpl-pagination-total">
      总页数 12
    </div>
    <div class="mpl-pagination-box">
      <div class="mpl-pagination-left mpl-pagination-item icon icon-arrow-left" />
      <div class="mpl-pagination-item">
        1
      </div>
      <div class="mpl-pagination-item">
        2
      </div>
      <div class="mpl-pagination-item">
        3
      </div>
      <div class="mpl-pagination-item">
        4
      </div>
      <div class="mpl-pagination-item">
        5
      </div>
      <div class="mpl-pagination-right mpl-pagination-item icon icon-arrow-right" />
    </div>
    <el-select class="mpl-pagination-page-sizes">
      <el-option />
    </el-select>
  </div>
</template>

<style lang="less">
.mpl-pagination {
  width: 100%;
  height: 50px;
  max-height: 50px;
  min-height: 50px;
  color: #333;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  box-sizing: border-box;

  .mpl-pagination-box {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;

    .mpl-pagination-item {
      height: 30px;
      width: 30px;
      line-height: 30px;
      user-select: none;
      cursor: default;

      &:hover {
        background-color: #ccc;
      }
    }
  }

  .mpl-pagination-page-sizes {
    width: 200px;
  }
}
</style>

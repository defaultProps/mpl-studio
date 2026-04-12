<script lang="ts" setup>
import { ref } from 'vue'
import { projectStore, viewStore } from '@mpl/store'

const dialogVisible = ref<boolean>(true)
const coreView = viewStore()
const selectedLayout = ref<BaseLayout | null>(null)

function handleClose() {
  dialogVisible.value = false
}

function cancelDialog() {
  dialogVisible.value = false
  coreView.$patch({
    visibleLayoutDialog: false
  })
}

function handleSubmit() {
  dialogVisible.value = false
  coreView.$patch({
    visibleLayoutDialog: false
  })

  console.error('未完成')
}

interface BaseLayout {
  label: string
  value: string
  img: string
}

const baseLayout = ref<BaseLayout[]>([
  { label: '基础表格查询模板', value: 'baseLayout1', img: '' },
  { label: '基础目录详情模板', value: 'baseLayout2', img: '' },
  { label: '目录表格查询模板', value: 'baseLayout3', img: '' },
  { label: '基础面板列表模板', value: 'baseLayout4', img: '' },
  { label: '基础图表展示模板', value: 'baseLayout5', img: '' },
  { label: '节点信息详情模板', value: 'baseLayout6', img: '' },
  { label: '其他模板', value: 'baseLayout7', img: '' },
  { label: '其他模板', value: 'baseLayout7', img: '' },
  { label: '其他模板', value: 'baseLayout7', img: '' },
  { label: '其他模板', value: 'baseLayout7', img: '' },
  { label: '其他模板', value: 'baseLayout7', img: '' },
  { label: '其他模板', value: 'baseLayout7', img: '' },
  { label: '其他模板', value: 'baseLayout7', img: '' },
  { label: '其他模板', value: 'baseLayout7', img: '' },
  { label: '其他模板', value: 'baseLayout7', img: '' },
  { label: '其他模板', value: 'baseLayout7', img: '' },
  { label: '其他模板', value: 'baseLayout7', img: '' },
  { label: '其他模板', value: 'baseLayout7', img: '' },
  { label: '其他模板', value: 'baseLayout7', img: '' },
  { label: '其他模板', value: 'baseLayout7', img: '' },
  { label: '其他模板', value: 'baseLayout7', img: '' },
  { label: '其他模板', value: 'baseLayout7', img: '' },
  { label: '其他模板', value: 'baseLayout7', img: '' },
])

function handleSelect(item: BaseLayout) {
  selectedLayout.value = item
}
</script>
<template>
  <el-dialog v-if="dialogVisible" v-model="dialogVisible" title="模板选择" width="1200" top="100px" :show-close="false"
    :before-close="handleClose" class="layout-dialog">
    <div v-for="item in baseLayout" :key="item.value" class="layout-item"
      :class="{ selected: selectedLayout?.value === item.value }" @click="handleSelect(item)">
      <img :src="item.img" alt="">
      <span>{{ item.label }}</span>
    </div>
    <template #footer>
      <button class="dialog-btn mr-10" type="button" @click="cancelDialog">
        取消
      </button>
      <button class="dialog-btn primary-btn" type="button" @click="handleSubmit">
        确认
      </button>
    </template>
  </el-dialog>
</template>
<style lang="less">
.layout-dialog .el-dialog__body {
  display: grid;
  grid-template-columns: auto auto auto auto;
  grid-gap: 15px;
  max-height: 60vh;
  padding-bottom: 10px;

  .layout-item {
    display: inline-flex;
    height: 180px;
    outline: 1px solid #ccc;
    box-sizing: border-box;
    background: #f0f0f099;
    border-radius: var(--radius-2);
    overflow: hidden;
    flex-direction: column;

    &:hover {
      outline: 1px solid var(--primary-color);
    }

    &.selected {
      outline: 1.5px solid var(--primary-color);
    }

    img {
      display: inline-block;
      width: 100%;
      flex: 1;
    }

    span {
      display: inline-block;
      width: 100%;
      height: 30px;
      line-height: 30px;
      text-align: center;
      font-size: 12px;
      color: #1e1e1e;
      overflow: hidden;
      text-overflow: ellipsis;
      border-top: 1px solid #ccc;
    }
  }
}
</style>
<script lang='ts' setup>
import type { TableColumn } from './define'
import { VueDraggable } from 'vue-draggable-plus'

const treeData = defineModel<TableColumn[]>({ default: [] })

</script>
<template>
  <VueDraggable v-if="treeData.length" v-model="treeData" class="drag-area" tag="div" group="g1" :animation="300">
    <div v-for="el in treeData" :key="el.cid">
      <div class="col-title">
        {{ el.label.text || '列标题' }}
      </div>
      <NestedColumn v-model="el.children" />
    </div>
  </VueDraggable>
</template>
<style lang='less'>
.drag-area {
  min-height: 6px;
  padding-left: 15px;

  .col-title {
    cursor: all-scroll;
    background: #f6f8fa;

    &:focus {
      background: #f0f0f0;
    }

    &::before {
      content: "";
      position: absolute;
      border-top: 1px dashed #666;
      left: 0;
      overflow: hidden;
      margin-top: 8px;
      width: 100%;
      z-index: -2;
    }
  }
}
</style>
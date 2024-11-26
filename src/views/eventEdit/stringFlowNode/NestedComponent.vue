<script setup lang="ts">
  import { VueDraggable } from 'vue-draggable-plus'
  import { computed } from 'vue'
 import { StringFlowNode } from './init'
  import DialogVisibleNode from './DialogVisibleFlowNode.vue'

  const props = defineProps<{ modelValue: StringFlowNode[] }>()
  const emits = defineEmits(['update:modelValue'])
  const list = computed({
    get: () => props.modelValue,
    set: value => emits('update:modelValue', value)
  })
</script>
<template>
  <VueDraggable class="drag-area" scroll tag="div" :animation="150" v-model="list" handle=".flow-node-handle"
                group="flowNode">
    <template v-for="el in modelValue">
      <DialogVisibleNode :value="el" />
      <div v-if="Array.isArray(el.children)">
        <nested-component v-model="el.children" />
      </div>
    </template>
  </VueDraggable>
</template>

<style scoped lang="less">
  .drag-area {
    min-height: 50px;
    border-left: 1px dashed #606266;
    border-right: 0;
    padding: 0 0 0 5px;
    box-sizing: border-box;

    .drag-area {
      margin: 0 0 0 25px;
    }
  }
</style>
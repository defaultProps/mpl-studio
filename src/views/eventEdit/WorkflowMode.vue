<script setup lang="ts">
  import { VueFlow, useVueFlow } from '@vue-flow/core'
  import { Background } from '@vue-flow/background'
  import useDragAndDrop from './useDnD'
  import SetVModelNode from './workflowNode/SetVModelNode.vue'
  import DialogVisibleNode from './workflowNode/DialogVisibleNode.vue'
  import ServiceNode from './workflowNode/ServiceNode.vue'
  import ValidateNode from './workflowNode/ValidateNode.vue'
  import ValidateFormItemNode from './workflowNode/ValidateFormItemNode.vue'
  import ClearValidate from './workflowNode/ClearValidate.vue'
  import ResetFormNode from './workflowNode/ResetFormNode.vue'
  import HttpNode from './workflowNode/HttpNode.vue'
  import VisibleNode from './workflowNode/VisibleNode.vue'
  import { initialEdges, initialNodes } from './workflowNode/init'
  import { ref } from 'vue'

  const { onConnect, addEdges } = useVueFlow()
  const { onDragOver, onDrop, onDragLeave, isDragOver } = useDragAndDrop()

  const nodes = ref(initialNodes)
  const edges = ref(initialEdges)
  onConnect(addEdges)
</script>
<template>
  <div class="workflow-container" :style="{ backgroundColor: isDragOver ? '#f6f8fa' : 'transparent' }" @drop="onDrop">
    <VueFlow :nodes="nodes" :edges="edges" :default-viewport="{ zoom: 1 }" snap-to-grid :snap-grid="[10, 10]" :min-zoom="0.5" :max-zoom="3"
      @dragover="onDragOver" @dragleave="onDragLeave">
      <template #node-setVModel="setVModelNodeProps">
        <SetVModelNode :value="setVModelNodeProps" />
      </template>
      <template #node-service="serviceNodeProps">
        <ServiceNode :value="serviceNodeProps" />
      </template>
      <template #node-dialogVisible="dialogVisibleNodeProps">
        <DialogVisibleNode :value="dialogVisibleNodeProps" />
      </template>
      <template #node-validate="validateProps">
        <ValidateNode :value="validateProps" />
      </template>
      <template #node-validateFormItem="validateFormItemProps">
        <ValidateFormItemNode :value="validateFormItemProps" />
      </template>
      <template #node-clearValidate="clearValidateProps">
        <ClearValidate :value="clearValidateProps" />
      </template>
      <template #node-resetForm="resetFormProps">
        <ResetFormNode :value="resetFormProps" />
      </template>
      <template #node-http="httpProps">
        <HttpNode :value="httpProps" />
      </template>
      <template #node-visibleNode="visibleNodeProps">
        <VisibleNode :value="visibleNodeProps" />
      </template>
      <Background pattern-color="#aaa" :gap="20" />
    </VueFlow>
  </div>
</template>
<style lang="less" scoped>
.workflow-container {
  display: flow-root;
  transition: background-color 0.2s ease;
  position: relative;
  background-color: var(--color-7);
  flex: 1;
  height: 100%;
}
</style>
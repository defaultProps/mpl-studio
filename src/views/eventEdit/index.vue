<script setup lang="ts">
import './workflowNode/flow-node.less'
import NodeIDE from './NodeIDE.vue'
</script>

<template>
  <div class="event-tool mpl-scroll-none">
    <!-- <FlowRoot v-if="workbench.activeEvent.type === 'flow'" /> -->
    <!-- <NodeIDE /> -->
  </div>
</template>

<style lang="less" scoped>
.event-tool {
  background: #ffffff;
  width: 100%;
  height: 100%;
  display: flow-root;
  transition: background 0.2s ease;
  position: relative;
}
</style>

<script setup lang="ts">
  import './workflowNode/flow-node.less'
  import FlowRoot from './FlowRoot.vue'
  import NodeIDE from './NodeIDE.vue'
  import EventDocs from './EventDocs.vue'
  import mplStore from '@mpl/store'

  const workbenchStore = mplStore.workbenchStore()
</script>

<template>
  <div v-if="workbenchStore.activeEvent && workbenchStore.activeNode" class="event-tool mpl-scroll-none">
    <EventDocs v-if="!workbenchStore.activeEvent.checked" />
    <FlowRoot v-else-if="workbenchStore.activeEvent.type === 'flow'" />
    <NodeIDE v-else />
  </div>
</template>

<style lang="less" scoped>
  .event-tool {
    background-color: var(--color-7);
    width: 100%;
    height: 100%;
    display: flow-root;
    transition: background-color 0.2s ease;
    position: relative;
  }
</style>

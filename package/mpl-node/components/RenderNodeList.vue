<script setup lang="ts">
  import { inject, markRaw, ref } from 'vue'
  import { Node, SettingMap } from '@mpl/typings'
  import { mapNodeSetting } from '../index'
  import { ACTIVE_NODE, IS_DRAGGER } from '../libs/index'
  import NodeBox from './NodeBox.vue'

  const props = defineProps<{
    nodeList: Node[],
    ui: 'elementPlus' | 'vant4' | 'antDesign' | 'antDesignMobile'
  }>()

  const currentNode = inject(ACTIVE_NODE, ref(null))
  const isDragging = inject(IS_DRAGGER, ref(false))
  function shadowRowComponent(p: SettingMap | undefined) {
    return p ? markRaw(p.workbench[props.ui]) : null
  }
  const isMobile = ref<boolean>(['vant4', 'antDesignMobile'].includes(props.ui))
</script>

<template>
  <template v-for="node in props.nodeList" :key="node.cid">
    <template v-if="['mpl-dialog', 'mpl-drawer'].includes(node.tag)">
      <component :is="shadowRowComponent(mapNodeSetting[node.tag])" :node="node" :active-cid="currentNode?.cid || ''" />
    </template>
    <NodeBox v-else-if="node.tag !== 'mpl-body'" :node="node" :is-dragging="isDragging"
             :is-dragging-node="node.cid === currentNode?.cid" :is-mobile="isMobile" :active-id="currentNode?.cid || ''"
             draggable="true">
      <component :is-mobile="isMobile" :is="shadowRowComponent(mapNodeSetting[node.tag])" :node="node"
                 :active-cid="currentNode?.cid || ''" />
    </NodeBox>
  </template>
</template>

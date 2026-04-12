<script setup lang="ts">
import { Handle, Position, useVueFlow } from '@vue-flow/core'
import ToolBtnGroup from '../ToolBtnGroup.vue'
import { NodeResizer } from '@vue-flow/node-resizer'
import '@vue-flow/node-resizer/dist/style.css'
import useDragAndDrop from '../useDnD'
import { newId } from '@mpl/libs'
import { inject, ref } from 'vue'
import FlowItem from './FlowItem.vue'

const {
  addNodes,
  // screenToFlowCoordinate
} = useVueFlow()
const { draggedType } = useDragAndDrop()
const props = defineProps<{ value: any }>()
const removeFlowNode = inject('removeFlowNode') as any
const resetExecuteFlowNode = inject('resetExecuteFlowNode') as any
const isCollapse = ref(true)

function drop(event: any) {
  console.log(event, event.dataTransfer?.getData("flowType"), draggedType.value)
  if (event.dataTransfer?.getData("flowType") !== draggedType.value) {
    console.warn('无效拖拽节点')
    return
  }

  // const position = screenToFlowCoordinate({
  //   x: event.clientX,
  //   y: event.clientY
  // })

  // 当前节点的位置，与拖拉拽drop落下的位置加减得出位置，并且动态增加容器宽度

  console.log(event, event.clientX)

  const newNode = {
    id: newId(),
    type: draggedType.value,
    position: {
      x: 10,
      y: 10
    },
    expandParent: true,
    parentNode: props.value.id,
  }
  addNodes(newNode)
}

function collapseFlowNode(collapse: boolean) {
  isCollapse.value = collapse
}
</script>
<template>
  <NodeResizer :min-width="500" :min-height="250" handle-class-name="mpl-flow-resize-node" />
  <div class="mpl-execute-flow-node" @drop.stop="drop">
    <FlowItem is-label title="支持">
      执行块
      <ToolBtnGroup copy splice @delete="removeFlowNode(props.value.id)" @reset="resetExecuteFlowNode(props.value.id)"
        @collapse="collapseFlowNode" />
    </FlowItem>
  </div>

  <Handle type="target" :position="Position.Top" />
  <Handle type="source" :position="Position.Bottom" />
</template>
<style lang="less">
.mpl-execute-flow-node {
  box-sizing: border-box;
  border: 0;
  position: relative;
  width: 100%;
  border-radius: 12px;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  background: #f6f8fa;
  user-select: none;
  overflow: auto;

  .execute-title {
    position: absolute;
    text-align: center;
    left: 0;
    right: 0;
    user-select: none;
    pointer-events: none;
  }
}

// .vue-flow__resize-control.line.right {
//   border-right-width: 2px;
// }

// .vue-flow__resize-control.line.top {
//   border-top-width: 2px;
// }

// .vue-flow__resize-control.line.left {
//   border-left-width: 2px;
// }

// .vue-flow__resize-control.line.bottom {
//   border-bottom-width: 4px;
// }

.vue-flow__resize-control.handle {
  background-color: #767676;
}

div.vue-flow__resize-control.line {
  border: 1px solid #767676;
}
</style>
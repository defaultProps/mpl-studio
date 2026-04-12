<script setup lang="ts">
import { VueFlow, useVueFlow, ConnectionLineType, Panel } from '@vue-flow/core'
import type { NodeChange, EdgeChange, Node, Edge } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import useDragAndDrop from './useDnD'
import SetVModelNode from './workflowNode/SetVModelNode.vue'
import DialogVisibleNode from './workflowNode/DialogVisibleNode.vue'
import ServiceNode from './workflowNode/ServiceNode.vue'
import ValidateNode from './workflowNode/ValidateNode.vue'
import ValidateFormItemNode from './workflowNode/ValidateFormItemNode.vue'
import ClearValidate from './workflowNode/ClearValidate.vue'
import ResetFormNode from './workflowNode/ResetFormNode.vue'
import VisibleNode from './workflowNode/VisibleNode.vue'
import FormNodeSetVModel from './workflowNode/FormNodeSetVModel.vue'
import ClearNodeData from './workflowNode/ClearNodeData.vue'
import DisabledNode from './workflowNode/DisabledNode.vue'
import UpdateFormNodeOptions from './workflowNode/UpdateFormNodeOptions.vue'
import MessageBox from './workflowNode/MessageBox.vue'
import ValidateDialog from './workflowNode/ValidateDialog.vue'
import CustomServiceNode from './workflowNode/CustomServiceNode.vue'
import PlatformServiceNode from './workflowNode/PlatformServiceNode.vue'
import ThirdServiceNode from './workflowNode/ThirdServiceNode.vue'
import MPLServiceNode from './workflowNode/MPLServiceNode.vue'
import ExecuteBlockNode from './workflowNode/ExecuteBlockNode.vue'
import ForEachBlockNode from './workflowNode/ForEachBlockNode.vue'
import ConnectBtn from './workflowEdge/ConnectBtn.vue'
import ConnectionLine from './workflowEdge/ConnectionLine.vue'
import { initialEdges, initialNodes } from './workflowNode/init'
import { ref, provide, nextTick, onMounted } from 'vue'
import { newId } from '@mpl/libs'
import { useLayout } from './useLayout'

const {
  onConnect,
  addEdges,
  onNodesChange,
  applyNodeChanges,
  screenToFlowCoordinate,
  onEdgesChange,
  fitView,
  applyEdgeChanges } = useVueFlow()
const { onDragOver, onDrop, onDragLeave, isValidDropNode } = useDragAndDrop()
const defaultConnectLineType: ConnectionLineType = ConnectionLineType.SmoothStep
const { layout, previousDirection } = useLayout()
const nodes = ref<Node[]>([])
const edges = ref<Edge[]>([])

onConnect(addEdges)

onMounted(() => {
  nodes.value = initialNodes
  edges.value = initialEdges
})

onNodesChange(async (changes) => {
  const nextChanges: NodeChange[] = []

  changes.forEach(change => {
    if (change.type === 'remove') {
      nextChanges.push(change)
    } else {
      nextChanges.push(change)
    }
  })

  applyNodeChanges(nextChanges)
})

onEdgesChange(async (changes) => {
  const nextChanges: EdgeChange[] = []

  changes.forEach(change => {
    if (change.type === 'remove') {
      nextChanges.push(change)
    } else {
      if (change.type === 'add') {
        change.item.type = 'smoothstep'
      }
      nextChanges.push(change)
    }
    nextChanges.push(change)
  })

  applyEdgeChanges(nextChanges)
})

function removeFlowNode(id: string) {
  const index = nodes.value.findIndex(node => node.id === id)

  if (index >= 0) {
    edges.value = edges.value.filter(v => v.source !== nodes.value[index]!.id && v.target !== nodes.value[index]!.id)
    nodes.value.splice(index, 1)
  }
}

function resetExecuteFlowNode(id: string) {
  nodes.value = nodes.value.filter(node => node.parentNode !== id)
}

function insertNodeInEdge(event: any, edgeId: string) {
  const nodeType = isValidDropNode(event)

  if (nodeType === false) {
    console.warn('无效拖拽节点')
    return
  }
  const position = screenToFlowCoordinate({
    x: event.clientX,
    y: event.clientY
  })

  const newNode = {
    id: newId(),
    type: nodeType,
    position
  }

  nodes.value.push(newNode)

  const index = edges.value.findIndex(edge => edge.id === edgeId)
  if (index >= 0) {
    const { source, target } = edges.value[index] as Edge
    const edge1 = { id: newId(), type: 'button', source, target: newNode.id }
    const edge2 = { id: newId(), type: 'button', source: newNode.id, target }

    edges.value.splice(index, 1)
    edges.value.push(edge1, edge2)

    nextTick(() => {
      fitView()
      console.log('fitView')
    })
  }
}

provide('removeFlowNode', removeFlowNode)
provide('resetExecuteFlowNode', resetExecuteFlowNode)
provide('insertNodeInEdge', insertNodeInEdge)

async function layoutGraph() {
  nodes.value = layout(nodes.value, edges.value, previousDirection.value === 'LR' ? 'TB' : 'LR')

  nextTick(() => {
    fitView()
  })
}

function saveFlow() {
  console.log(nodes.value, edges.value)
}

</script>
<template>
  <div class="workflow-container" @drop="onDrop">
    <VueFlow v-model:edges="edges" v-model:nodes="nodes" elevate-edges-on-select :apply-default="false"
      :nodes-draggable="true" :default-viewport="{ zoom: 1 }" snap-to-grid
      :connection-line-type="defaultConnectLineType" :snap-grid="[5, 5]" :min-zoom="0.5" :max-zoom="2"
      @dragover="onDragOver" @dragleave="onDragLeave">
      <!-- 工具栏 -->
      <Panel class="process-panel" position="top-right">
        <button type="button" class="mpl-btn mr-5 icon-shujupingheng icon" @click="layoutGraph">
          格式排版
        </button>
      </Panel>
      <!-- 拖拽连接线条 -->
      <template #connection-line="{ sourceX, sourceY, targetX, targetY }">
        <ConnectionLine :source-x="sourceX" :source-y="sourceY" :target-x="targetX" :target-y="targetY" />
      </template>
      <!-- 静态线条 -->
      <template #edge-button="buttonEdgeProps">
        <ConnectBtn :id="buttonEdgeProps.id" :source-x="buttonEdgeProps.sourceX" :source-y="buttonEdgeProps.sourceY"
          :target-x="buttonEdgeProps.targetX" :target-y="buttonEdgeProps.targetY"
          :source-position="buttonEdgeProps.sourcePosition" :target-position="buttonEdgeProps.targetPosition"
          :marker-end="buttonEdgeProps.markerEnd" :style="buttonEdgeProps.style || {}" />
      </template>
      <!-- 设置表单值 -->
      <template #node-setVModel="scoped">
        <SetVModelNode :value="scoped" />
      </template>
      <!-- 请求服务 -->
      <template #node-service="scoped">
        <ServiceNode :value="scoped" />
      </template>
      <!-- 弹窗 -->
      <template #node-dialogVisible="scoped">
        <DialogVisibleNode :value="scoped" />
      </template>
      <!-- 组件校验 -->
      <template #node-validate="scoped">
        <ValidateNode :value="scoped" />
      </template>
      <!-- 清除表单校验 -->
      <template #node-validateFormItem="scoped">
        <ValidateFormItemNode :value="scoped" />
      </template>
      <!-- 清除组件校验 -->
      <template #node-clearValidate="scoped">
        <ClearValidate :value="scoped" />
      </template>
      <!-- 重置表单 -->
      <template #node-resetForm="scoped">
        <ResetFormNode :value="scoped" />
      </template>
      <!-- 显示节点 -->
      <template #node-visibleNode="scoped">
        <VisibleNode :value="scoped" />
      </template>
      <!-- 组件赋值 -->
      <template #node-formNodeSetVModel="scoped">
        <FormNodeSetVModel :value="scoped" />
      </template>
      <!-- 控件数据清空 -->
      <template #node-clearFormItem="scoped">
        <ClearNodeData :value="scoped" />
      </template>
      <!-- 控件禁用 -->
      <template #node-disabledNode="scoped">
        <DisabledNode :value="scoped" />
      </template>
      <!-- 单选控件选项更新 -->
      <template #node-updateListOptions="scoped">
        <UpdateFormNodeOptions :value="scoped" />
      </template>
      <!-- 提示信息弹窗 -->
      <template #node-messageBox="scoped">
        <MessageBox :value="scoped" />
      </template>
      <!-- 校验弹窗 -->
      <template #node-validateDialog="scoped">
        <ValidateDialog :value="scoped" />
      </template>
      <!-- 自定义服务 -->
      <template #node-customService="scoped">
        <CustomServiceNode :value="scoped" />
      </template>
      <!-- mpl服务 -->
      <template #node-mplService="scoped">
        <MPLServiceNode :value="scoped" />
      </template>
      <!-- 平台服务 -->
      <template #node-platformService="scoped">
        <PlatformServiceNode :value="scoped" />
      </template>
      <!-- 其他服务 -->
      <template #node-thirdService="scoped">
        <ThirdServiceNode :value="scoped" />
      </template>
      <!-- 执行块 -->
      <template #node-executeBlock="scoped">
        <ExecuteBlockNode :value="scoped" />
      </template>

      <!-- 基础forEach循环块，提供代码预览功能 -->
      <template #node-forEachBlock="scoped">
        <ForEachBlockNode :value="scoped" />
      </template>


      <Background pattern-color="#aaa" :gap="20" />
    </VueFlow>
  </div>
</template>
<style lang="less" scoped>
.workflow-container {
  transition: background 0.2s ease;
  position: relative;
  background: #ffffff;
  flex: 1;
  height: 100%;
}
</style>

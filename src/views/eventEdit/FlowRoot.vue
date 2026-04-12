<script setup lang="ts">
import useDragAndDrop from './useDnD'
import { flowNodes } from '@mpl/const'
import WorkflowMode from './WorkflowMode.vue'
import StringFlowMode from './StringFlowMode.vue'
import { VueDraggable } from 'vue-draggable-plus'
import './workflowNode/flow-node.less'

const { onDragStart } = useDragAndDrop()
const editModel = defineModel<'catalogMode' | 'workflowMode' | 'IDEMode'>()

// 可以相互切换保存, 但是都不兼容代码编辑模式, 尽量满足90%场景
// 设计模式:
// 2、所有节点可一键切换为IDE节点, IDE节点不可反向切换
// 3、提供大量的辅助交互节点. 满足90%场景
// 4、提供存储位置、即使临时单节点都存储起来
</script>

<template>
  <div class="event-flow-container">
    <div class="interactive-box mpl-scroll-none">
      <template v-for="nodes in flowNodes">
        <div class="header-tool">
          {{ nodes.label }}
        </div>
        <VueDraggable v-if="nodes.children.length" v-model="nodes.children" :animation="300"
          :group="{ name: 'flowNode', pull: 'clone', put: false }" :sort="false">
          <div v-for="node in nodes.children" class="node" draggable="true" :aria-field="node.value" :title="node.label"
            @dragstart="onDragStart($event, node.value)">
            {{ node.label }}
          </div>
        </VueDraggable>
      </template>
    </div>
    <!-- 流程模式 -->
    <WorkflowMode v-if="editModel === 'workflowMode'" />
    <!-- 目录模式 -->
    <StringFlowMode v-else-if="editModel === 'catalogMode'" />
  </div>
</template>

<style lang="less" scoped>
.event-flow-container {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  overflow: hidden;

  .interactive-box {
    background: #ffffff;
    height: 100%;
    width: 205px;
    min-width: 205px;
    overflow: auto;
    border-right: 1px solid #cccccc;
    box-sizing: border-box;

    .header-tool {
      line-height: 25px;
      font-size: 12px;
      width: 100%;
      text-align: center;
      color: #909399;
      font-weight: 600;
    }

    .node {
      width: 92px;
      line-height: 30px;
      display: inline-block;
      text-align: left;
      margin: 5px;
      background: #f6f8fa;
      user-select: none;
      outline: 1px solid #1110109c;
      border-radius: 1px;
      padding: 0 3px;
      box-sizing: border-box;
      cursor: grab;
      color: #000000;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 12px;

      &:hover {
        outline: 2px solid #2f7f79;
      }
    }
  }
}
</style>

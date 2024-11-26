<script setup lang="ts">
  import { ref } from "vue";
  import useDragAndDrop from "./useDnD";
  import { flowNodes } from "@mpl/const";
  import WorkflowMode from "./WorkflowMode.vue";
  import StringFlowMode from "./StringFlowMode.vue";
  import { VueDraggable } from "vue-draggable-plus";

  const activeIA = ref<string>("nodeInteractive");
  const activeFlowMode = ref("workflow");
  const { onDragStart } = useDragAndDrop();

  const flowModeOptions = [
    { label: "流程排版", value: "workflow" },
    { label: "目录排版", value: "stringFlow" },
  ];
</script>

<template>
  <div class="event-flow-container">
    <div class="interactive-box mpl-scroll-none">
      <template v-for="nodes in flowNodes">
        <div class="header-tool icon" :class="[activeIA === nodes.value ? 'icon-xiala3' : 'icon-right1']"
             @click="activeIA = activeIA === nodes.value ? '' : nodes.value">
          {{ nodes.label }}
        </div>
        <div v-if="activeIA === nodes.value" class="node-list mpl-scroll-none">
          <VueDraggable v-model="nodes.children" :animation="150"
                        :group="{ name: 'flowNode', pull: 'clone', put: false }" :sort="false">
            <div v-for="node in nodes.children" class="node" draggable="true"
                 @dragstart="onDragStart($event, node.value)">
              <!-- <i class="icon icon-yulan"></i> -->
              {{ node.label }}
            </div>
          </VueDraggable>
        </div>
      </template>
    </div>
    <div class="btn-group">
      <button v-for="opt in flowModeOptions" :key="opt.value" class="mpl-btn mr-2"
              :class="{ 'is-active': opt.value === activeFlowMode }" @click="activeFlowMode = opt.value">
        {{ opt.label }}
      </button>
    </div>
    <WorkflowMode v-if="activeFlowMode === 'workflow'" />
    <StringFlowMode v-else />
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

    .btn-group {
      position: absolute;
      top: 10px;
      left: 218px;
      z-index: 100;
    }

    .interactive-box {
      background: var(--color-7);
      height: 100%;
      width: 205px;
      min-width: 205px;
      overflow: auto;
      border-right: 1px solid var(--color-1);
      box-sizing: border-box;

      .header-tool {
        min-height: 25px;
        padding: 0 3px;
        box-sizing: border-box;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: 12px;
        width: 100%;
        background-color: #e6e6e6;
        border-bottom: 1px solid var(--color-1);
        color: #000;
        position: relative;
        font-size: 12px;
        user-select: none;
        position: sticky;
        top: 0;
      }

      .node {
        width: 90px;
        line-height: 30px;
        display: inline-block;
        text-align: center;
        margin: 5px;
        background: #f6f8fa;
        user-select: none;
        outline: 1px solid #1110109c;
        border-radius: 1px;
        cursor: grab;
        color: #000000;

        &:hover {
          outline: 1px solid #2f7f79;
        }
      }
    }
  }
</style>

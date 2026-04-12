<script setup lang="ts">
import { ref, inject } from "vue";
import { Handle, Position } from "@vue-flow/core";
import ToolBtnGroup from "../ToolBtnGroup.vue";
import FlowItem from './FlowItem.vue'

const nodes = [
  { label: "基础输入", value: "a" },
  { label: "下拉选择", value: "sd2gr6" },
  { label: "级联选择", value: "bf3ht5" },
  { label: "多行输入", value: "mj7ku8" },
];

const selectNode = ref<string>("a");
const removeFlowNode = inject("removeFlowNode") as any;
const props = defineProps<{ value: any }>();
const isCollapse = ref(true)

function collapseFlowNode(collapse: boolean) {
  isCollapse.value = collapse
}
</script>

<template>
  <div class="set-model-node mpl-event-flow-node" :class="{ 'is-error': !selectNode, 'is-collapse': isCollapse }">
    <Handle type="target" :position="Position.Top" />
    <Handle type="source" :position="Position.Bottom" />
    <FlowItem label="描述" is-label>
      控件校验清除
      <ToolBtnGroup copy @delete="removeFlowNode(props.value.id)" @collapse="collapseFlowNode" />
    </FlowItem>
    <FlowItem label="选择控件">
      <select v-model="selectNode" class="mpl-select full-w">
        <option v-for="item in nodes" :key="item.value" :label="item.label" :value="item.value" />
      </select>
    </FlowItem>
  </div>
</template>

<style lang="less" scoped>
.set-model-node {
  width: 300px;
}
</style>

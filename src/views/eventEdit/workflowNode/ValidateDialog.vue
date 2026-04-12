<script setup lang="ts">
import { ref, inject } from "vue";
import { Handle, Position } from "@vue-flow/core";
import ToolBtnGroup from "../ToolBtnGroup.vue";
import type { NODE_TAG } from "@mpl/typings";

const nodes: Array<{ label: string; value: NODE_TAG }> = [
  { label: "基础输入框", value: "mpl-password" },
  { label: "密码输入框", value: "mpl-input" },
  { label: "下拉选择", value: "mpl-select" },
  { label: "开关", value: "mpl-switch" },
];

const flowNodes = ref([
  {
    tag: "mpl-password",
    type: "",
    val: "",
  },
]);

function selectNode(
  node: { tag: string; type: string; val: string },
  index: number
) {
  console.log(node, index);
}

function deleteNode(index: number) {
  flowNodes.value.splice(index, 1);
}

const removeFlowNode = inject("removeFlowNode") as any;
const props = defineProps<{ value: any }>();
const isCollapse = ref(true)

function collapseFlowNode(collapse: boolean) {
  isCollapse.value = collapse
}
</script>

<template>
  <div class="set-model-node mpl-event-flow-node" :class="{ 'is-error': !flowNodes.length, 'is-collapse': isCollapse }">
    <ToolBtnGroup copy @delete="removeFlowNode(props.value.id)" @collapse="collapseFlowNode" />
    <Handle type="target" :position="Position.Top" />
    <div class="line-box">
      <div class="label">
        描述：
      </div>
      <div class="content">
        弹窗表单验证
      </div>
    </div>
    <div v-for="(node, index) in flowNodes" class="line-box">
      <select v-model="node.tag" class="mpl-select full-w">
        <option v-for="item in nodes" :key="item.value" :label="item.label" :value="item.value" />
      </select>
      <input type="text" class="mpl-input ml-5">
      <button type="button" class="mpl-btn ml-5 icon icon-drag" @click="selectNode(node, index)" />
      <button type="button" class="mpl-btn ml-5 icon icon-add" @click="selectNode(node, index)" />
      <button type="button" class="mpl-btn ml-5 icon icon-select5" @click="selectNode(node, index)" />
      <button type="button" class="mpl-btn ml-5 icon icon-close1" @click="deleteNode(index)" />
    </div>
    <Handle id="target-a" type="target" :position="Position.Bottom" class="success-connect-node" title="校验成功后节点" />
    <Handle id="target-b" type="target" :position="Position.Bottom" class="failed-connect-node" title="校验失败后节点" />
  </div>
</template>

<style lang="less" scoped>
.set-model-node {
  width: 300px;
}
</style>

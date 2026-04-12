<script setup lang="ts">
import { ref, inject } from "vue";
import { Handle, Position } from "@vue-flow/core";
import ToolBtnGroup from "../ToolBtnGroup.vue";

const nodes = [
  { label: "基础输入", value: "a" },
  { label: "下拉选择", value: "sd2gr6" },
  { label: "级联选择", value: "bf3ht5" },
  { label: "多行输入", value: "mj7ku8" },
];

const flowNode = ref({
  node: "a",
  type: "node",
  val: "",
});
const removeFlowNode = inject("removeFlowNode") as any;
const props = defineProps<{ value: any }>();
const isCollapse = ref(true)

function collapseFlowNode(collapse: boolean) {
  isCollapse.value = collapse
}
</script>

<template>
  <div class="set-model-node mpl-event-flow-node" :class="{ 'is-error': !flowNode.val, 'is-collapse': isCollapse }">
    <ToolBtnGroup copy @delete="removeFlowNode(props.value.id)" @collapse="collapseFlowNode" />
    <Handle type="target" :position="Position.Top" />
    <div class="line-box">
      <div class="label">
        描述：
      </div>
      <div class="content">
        校验表单控件
      </div>
    </div>
    <div class="line-box" style="margin-bottom: 15px;">
      <div class="label">
        选择组件：
      </div>
      <!-- 实现多选 -->
      <select v-model="flowNode.val" class="mpl-select">
        <option v-for="rule in nodes" :label="rule.label" :value="rule.value" />
      </select>
      <button type="button" class="mpl-btn icon ml-5 icon-select5" />
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

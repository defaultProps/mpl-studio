<script setup lang="ts">
import { ref, inject } from "vue";
import { Handle, Position } from "@vue-flow/core";
import ToolBtnGroup from "../ToolBtnGroup.vue";
import FlowItem from './FlowItem.vue'

const removeFlowNode = inject("removeFlowNode") as any;
const props = defineProps<{ value: any }>();
const nodes = [
  { label: "基础输入", value: "a" },
  { label: "下拉选择", value: "sd2gr6" },
  { label: "级联选择", value: "bf3ht5" },
  { label: "多行输入", value: "mj7ku8" },
];
const isCollapse = ref(true)

const bindOption = [
  { label: "表单控件", value: "node" },
  { label: "固定值", value: "default" },
  { label: "计算值", value: "calculate" },
];

const flowNodes = ref([{
  node: "a",
  type: "node",
  val: "",
}]);

function collapseFlowNode(collapse: boolean) {
  isCollapse.value = collapse
}

function addLineRow() {
  flowNodes.value.push({
    node: "a",
    type: "node",
    val: "",
  })
}

function deleteLineRow(i: number) {
  flowNodes.value.splice(i, 1)
}

</script>

<template>
  <div class="mpl-event-flow-node" style="width: 350px;" :class="{ 'is-collapse': isCollapse }">
    <Handle type="target" :position="Position.Top" />
    <Handle type="source" :position="Position.Bottom" />
    <FlowItem label="交互" is-label>
      设置表单值
      <ToolBtnGroup copy @delete="removeFlowNode(props.value.id)" @collapse="collapseFlowNode" />
    </FlowItem>
    <template v-if="isCollapse">
      <FlowItem size="small">
        <span style="width: 80px;" class="mr-5">组件</span>
        <span style="width: 80px;" class="mr-5">值类型</span>
        <span style="flex: 1">值</span>
      </FlowItem>
      <FlowItem v-for="(item, i) in flowNodes" :key="item.node">
        <select v-model="item.node" class="mpl-select flex-1" style="max-width: 80px;min-width: 80px;">
          <option v-for="rule in nodes" :label="rule.label" :value="rule.value" />
        </select>
        <select v-model="item.type" class="mpl-select ml-5 mr-5 flex-1" style="max-width: 80px;min-width: 80px;">
          <option v-for="rule in bindOption" :label="rule.label" :value="rule.value" />
        </select>
        <template v-if="item.type === 'calculate'">
          <input v-model="item.val" class="mpl-input flex-1 mr-5" readonly>
          <button type="button" class="mpl-btn icon icon-select5" />
        </template>
        <input v-else-if="item.type === 'default'" v-model="item.val" class="mpl-input">
        <select v-else v-model="item.val" class="mpl-select flex-1">
          <option v-for="rule in nodes" :label="rule.label" :value="rule.value" />
        </select>
        <button type="button" class="mpl-btn icon-close1 del-btn icon ml-5" title="流程锁定/解锁" @click.stop="deleteLineRow(i)" />
      </FlowItem>
      <button type="button" class="mpl-btn icon icon-add mb-5" title="流程锁定/解锁" @click.stop="addLineRow" />
    </template>
  </div>
</template>
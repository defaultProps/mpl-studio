<script setup lang="ts">
import { ref, inject } from "vue";
import { Handle, Position } from "@vue-flow/core";
import ToolBtnGroup from "../ToolBtnGroup.vue";
import { systemVarList } from "@mpl/const";
import FlowItem from './FlowItem.vue'

const nodes = [
  { label: "基础输入", value: "a" },
  { label: "下拉选择", value: "sd2gr6" },
  { label: "级联选择", value: "bf3ht5" },
  { label: "多行输入", value: "mj7ku8" },
];

const typeOptions = [
  { label: "表单组件", value: "formNode" },
  { label: "系统值", value: "system" },
  { label: "自定义", value: "custom" },
];

const flowNodeObj = ref({
  selectNode: "",
  type: "",
  val: "",
});

function changeType() {
  flowNodeObj.value.val = "";
}

function openIDEDialog() {
  //
}

const removeFlowNode = inject("removeFlowNode") as any;
const props = defineProps<{ value: any }>();
const isCollapse = ref(true)

function collapseFlowNode(collapse: boolean) {
  isCollapse.value = collapse
}
</script>

<template>
  <div class="mpl-event-flow-node" :class="{ 'is-error': !flowNodeObj.selectNode, 'is-collapse': isCollapse }">
    <Handle type="target" :position="Position.Top" />

    <FlowItem label="交互" is-label>
      表单控件赋值
      <ToolBtnGroup copy @delete="removeFlowNode(props.value.id)" @collapse="collapseFlowNode" />
    </FlowItem>
    <FlowItem label="选择控件">
      <select v-model="flowNodeObj.selectNode" class="mpl-select w-full">
        <option v-for="item in nodes" :key="item.value" :label="item.label" :value="item.value" />
      </select>
    </FlowItem>
    <FlowItem label="设置值">
      <div class="flex-center" style="width: 240px;">
        <select v-model="flowNodeObj.type" style="min-width: 85px; max-width: 85px;" class="mpl-select mr-5"
          @change="changeType">
          <option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value" />
        </select>
        <select v-if="flowNodeObj.type === 'formNode'" v-model="flowNodeObj.val" style="min-width: 85px;"
          class="mpl-select flex-1">
          <option v-for="item in nodes" :key="item.value" :label="item.label" :value="item.value" />
        </select>
        <select v-else-if="flowNodeObj.type === 'system'" v-model="flowNodeObj.val" style="min-width: 85px;"
          class="mpl-select flex-1">
          <option v-for="item in systemVarList" :key="item.value" :label="item.label" :value="item.value" />
        </select>
        <template v-else>
          <input type="text" class="mpl-input mr-5 flex-1">
          <button type="button" class="mpl-btn icon icon-select5" @click="openIDEDialog" />
        </template>
      </div>
    </FlowItem>
    <FlowItem>
      <button type="button" class="mpl-btn icon icon-add" />
    </FlowItem>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
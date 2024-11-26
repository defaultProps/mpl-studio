<script lang="ts" setup>
import { ref } from 'vue'
import FormItem from "../../../components/FormItem.vue"
import { PanelProp, panelHeaderNodeTypeOptions, panelPaddingSizeOptions, PanelHeaderSlot } from './define'
import { VueDraggable } from "vue-draggable-plus"
import InputNode from "../../../components/InputNode.vue"
import SliderNode from "../../../components/SliderNode.vue"
import { watchDebounced } from "@vueuse/core"
import { newBaseButtonNode } from '../baseButton/define'
import { newCid } from "@mpl/const"

const props = defineProps<{ value: PanelProp }>()
const activeNode = ref<PanelProp>(props.value)
const selectNode = ref<PanelHeaderSlot | null>(null)
const emit = defineEmits(["changeNode"])

// 选择辅助组件
function handleSelectNode(node: PanelHeaderSlot) {
  selectNode.value = node
}

// 移除辅助组件
function removeNode(obj: PanelHeaderSlot, pos: number) {
  activeNode.value.header.slotNodes.splice(pos, 1)
  const index = activeNode.value.header.slotNodes.findIndex(v => v.cid === obj.cid)
  if (index >= 0) {
    activeNode.value.header.slotNodes.splice(index, 1)
  }
}

// 添加辅助组件
function addNode() {
  const newSlotNode = newBaseButtonNode(newCid())
  selectNode.value = {
    label: newSlotNode.mpl_title,
    value: newSlotNode.tag,
    cid: newSlotNode.cid
  }
  activeNode.value.header.slotNodes.push(newSlotNode)
  activeNode.value.header.slots.push(selectNode.value)
}

watchDebounced(activeNode.value, (val) => {
  emit("changeNode", val)
})
</script>

<template>
  <div class="right-bar-setting--box">
    <FormItem :label="`宽度比例 ${activeNode.pos.pc.w}`">
      <SliderNode v-model="activeNode.pos.pc.w" />
    </FormItem>
    <FormItem label="显示顶部">
      <input type="checkbox" class="mpl-input" v-model="activeNode.header.visible" />
    </FormItem>
    <FormItem label="顶部标题">
      <InputNode v-model="activeNode.header.label" />
    </FormItem>
    <div class="mpl-divider" label="顶部辅助组件"></div>
    <VueDraggable ref="el" v-model="activeNode.header.slots" handle=".mpl-panel-slot">
      <div v-for="(item, i) in activeNode.header.slots" :key="item.cid" class="slot-btn-line">
        <button class="mpl-btn mr-5 icon icon-edit5" :class="{ 'is-active': selectNode?.cid === item.cid }"
          @click="handleSelectNode(item)" />
        <button class="mpl-btn mr-5 icon icon-drag mpl-panel-slot" />
        <select v-model="item.value" class="mpl-select mr-5">
          <option v-for="v in panelHeaderNodeTypeOptions" :label="v.label" :value="v.value" />
        </select>
        <InputNode v-model="item.cid" disabled style="width: 60px" />
        <button class="mpl-btn del-btn ml-5 icon icon-close1" @click="removeNode(item, i)" />
      </div>
    </VueDraggable>
    <button class="mpl-btn plus-btn icon icon-plus" @click="addNode">添加组件</button>
    <div v-if="activeNode" class="slot-btn-setting">
      根据不同的选择组件显示不同的设置
    </div>
    <div class="mpl-divider" label="内容区域设置"></div>
    <FormItem label="内间距">
      <select v-model="activeNode.body.paddingSize" class="mpl-select mr-5">
        <option v-for="v in panelPaddingSizeOptions" :label="v.label" :value="v.value" />
      </select>
    </FormItem>
  </div>
</template>

<style lang="less">
.right-bar-setting--box {
  padding: 5px;
  box-sizing: border-box;

  .slot-btn-line {
    display: flex;
    height: 30px;
    align-items: center;
    justify-content: space-around;
  }
}
</style>

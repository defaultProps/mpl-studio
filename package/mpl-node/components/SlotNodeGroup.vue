<script setup lang="ts">
import { ref } from 'vue'
import { defaultNodeList } from '@mpl/const'
import { Node, SLOT_NODE } from '@mpl/typings'
import { newCid } from '@mpl/libs'
import { VueDraggable } from 'vue-draggable-plus'
import BaseBtn from './subComponents/BaseBtn.vue'
import BaseInput from './subComponents/BaseInput.vue'
import BaseText from './subComponents/BaseText.vue'
import BaseLink from './subComponents/BaseLink.vue'
import BaseIcon from './subComponents/BaseIcon.vue'
import { userStore } from '@mpl/store'
import { initSlotNode } from '../libs'

const user = userStore()
const slotNodeGroup = defineModel<SLOT_NODE[]>({ default: [] })
const selectNode = ref<Node | null | any>(null)

// 切换组件类型时。绑定事件eventList不删除
function changeNodeTag(slotNode: SLOT_NODE) {
  // 直接替换节点，删除所有事件
  const cid = newCid(slotNode.tag)
  slotNode.cid = cid
  slotNode.metaInfo = initSlotNode(slotNode.tag, cid)
}

function handleSelectNode(node: SLOT_NODE) {
  selectNode.value = node
}

function addBtnNode() {
  const cid = newCid('btn')
  const newSlotNode: SLOT_NODE = {
    cid,
    tag: 'btn',
    pos: 'r',
    metaInfo: initSlotNode('btn', cid)
  }
  slotNodeGroup.value.push(newSlotNode)
  selectNode.value = newSlotNode
}

function removeNode(node: SLOT_NODE, i: number) {
  if (node.cid === selectNode.value?.cid) {
    selectNode.value = null
  }
  slotNodeGroup.value.splice(i, 1)
}
</script>
<template>
  <VueDraggable v-if="slotNodeGroup.length" v-model="slotNodeGroup" :animation="300"
    handle=".mpl-baseInput-slotBtn-sort-handler">
    <div v-for="(node, i) in slotNodeGroup" :key="node.cid" class="slot-btn-line">
      <button type="button" class="mpl-btn mr-5 icon icon-edit5" :class="{ 'is-active': selectNode?.cid === node.cid }"
        @click="handleSelectNode(node)" />
      <button type="button" class="mpl-btn mr-5 icon icon-drag mpl-baseInput-slotBtn-sort-handler" />
      <select v-model="node.tag" class="mpl-select mr-5" @change="changeNodeTag(node)">
        <option v-for="n in defaultNodeList" :value="n.value">
          {{ n.label }}
        </option>
      </select>
      <select v-model="node.pos" class="mpl-select mr-5">
        <option value="l">
          左侧
        </option>
        <option value="r">
          右侧
        </option>
      </select>
      <button type="button" class="mpl-btn del-btn icon icon-close1" @click="removeNode(node, i)" />
    </div>
  </VueDraggable>
  <button type="button" class="mpl-btn plus-btn icon icon-plus mt-5 mb-2"
    :disabled="slotNodeGroup.length >= 5 || user.authority !== 'enterprise'" @click="addBtnNode">
    添加组件
  </button>
  <div v-if="selectNode" class="mpl-sub-form-block">
    <BaseBtn v-if="selectNode.tag === 'btn'" v-model="selectNode.metaInfo" />
    <BaseInput v-else-if="selectNode.tag === 'input'" v-model="selectNode.metaInfo" />
    <BaseText v-else-if="selectNode.tag === 'txt'" v-model="selectNode.metaInfo" />
    <BaseLink v-else-if="selectNode.tag === 'link'" v-model="selectNode.metaInfo" />
    <BaseIcon v-else-if="selectNode.tag === 'icon'" v-model="selectNode.metaInfo" />
  </div>
</template>
<style lang="less" scoped>
.slot-btn-line {
  display: flex;
  height: 30px;
  align-items: center;
  justify-content: space-around;
}
</style>

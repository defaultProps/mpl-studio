<script lang="ts" setup>
import { ref } from 'vue'
import { newCid } from '@mpl/const'
import FormItem from '../../../components/FormItem.vue'
import SliderNode from '../../../components/SliderNode.vue'
import InputNode from '../../../components/InputNode.vue'
import { Tabs, TabsPaneProp, newTabPane } from './define'
import { tabsEvent } from './define'
import { watchDebounced } from "@vueuse/core"
import { workbenchStore } from '@mpl/store'
import type { BaseBtn } from '@mpl/typings'

const props = defineProps<{ value: Tabs }>()
const emit = defineEmits(["changeNode"])
const activeNode = ref<Tabs>(props.value)
const activePane = ref<TabsPaneProp | null>()
const store = workbenchStore()
const activeFooterBtn = ref<BaseBtn>()

watchDebounced(activeNode.value, (val) => {
  emit("changeNode", val)
})

function handleActiveBtn(btn: BaseBtn) {
  activeFooterBtn.value = btn
}

function deletePane(index: number, pane: TabsPaneProp) {
  if (pane.cid === activePane.value?.cid)
    activePane.value = null

  // 删除面板 + 内部所有组件
  activeNode.value.tabs.panes.splice(index, 1)
}

function addDisabledName() {
  if (activePane.value) {
    store.singleEventPlus({
      name: tabsEvent.getPaneDisabledName(newCid()),
      code: `return false`,
      type: 'flow',
      desc: '页签 - 禁用',
    })
  }
}

function handleRemoveEvent(eventName: string) {
  store.singleEventReduce(eventName)
}

function addVisibleName() {
  if (activePane.value) {
    store.singleEventPlus({
      name: tabsEvent.getPaneVisibleName(newCid()),
      code: `return true`,
      type: 'flow',
      desc: '页签 - 显示/隐藏',
    })
  }
}

function deleteBtn(i: number) {
  if (activePane.value)
    activePane.value.footerBtnGroup.splice(i, 1)
}

function handleActivePane(pane: TabsPaneProp) {
  activePane.value = pane
}

// 新增页签
function addPane() {
  activeNode.value.tabs.panes.push(newTabPane())
}
</script>

<template>
  <div class="right-bar-tabs-setting--box">
    <FormItem :label="`宽度比例 ${activeNode.pos.pc.w}`">
      <SliderNode v-model="activeNode.pos.pc.w" />
    </FormItem>
    <FormItem label="显示隐藏" :var="`mpl.var.${activeNode.visible}`">
      <input type="checkbox" class="mpl-input" v-model="activeNode.visible" />
    </FormItem>
    <FormItem label="默认展开" :var="`mpl.${activeNode.cid}.activePane`"></FormItem>
    <div v-for="(pane, index) in activeNode.tabs.panes" :key="pane.cid" class="pane-setting">
      <button :class="{ 'is-active': activePane?.cid === pane.cid }" class="mpl-btn icon icon-edit5 mr-5"
        @click="handleActivePane(pane)" />
      <button class="mpl-btn icon icon-drag mr-5" />
      <InputNode v-model="pane.label" class="mr-5" />
      <label class="tabs-active-pane-radio-label mpl-radio-label">
        <input v-model="activeNode.activeModel" type="radio" name="tabs-active-pane-radio-label" class="mr-5"
          :value="pane.value" />
      </label>
      <button class="mpl-btn del-btn icon icon-close1 ml-5" @click="deletePane(index, pane)" />
    </div>
    <button class="mpl-btn mb-5 plus-btn icon icon-plus" @click="addPane">添加页签</button>
    <div v-if="activePane" class="select-edit-pane">
      <FormItem label="显示/隐藏">
        <InputNode v-model="activePane.visibleName" />
        <button class="mpl-btn icon icon-add ml-5" @click="addVisibleName" />
        <button v-if="activePane.visibleName" class="mpl-btn icon icon-close1 del-btn ml-5"
          @click="handleRemoveEvent(activePane.visibleName)" />
      </FormItem>
      <FormItem label="禁用">
        <InputNode v-model="activePane.disabledName" />
        <button class="mpl-btn icon icon-add ml-5" @click="addDisabledName" />
        <button v-if="activePane.disabledName" class="mpl-btn icon icon-close1 del-btn ml-5"
          @click="handleRemoveEvent(activePane.disabledName)" />
      </FormItem>
      <div v-for="(btn, i) in activePane.footerBtnGroup" :key="btn.cid" class="footer-btn-line">
        <button class="mpl-btn icon icon-edit5 mr-5" @click="handleActiveBtn(btn)" />
        <button class="mpl-btn icon icon-drag mr-5" />
        <InputNode v-model="btn.title" />
        <button class="mpl-btn del-btn icon icon-close1 ml-5" @click="deleteBtn(i)" />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.right-bar-tabs-setting--box {
  padding: 5px;
  box-sizing: border-box;
  font-size: 12px;

  .pane-setting {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 30px;
  }

  .select-edit-pane {
    background: #f6f8fa;
    padding: 5px 3px 5px 5px;
    box-sizing: border-box;
    margin: 5px 0;
    border-radius: 3px;
    outline: 1px solid #666;
  }

  .footer-btn-line {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 30px;
  }
}
</style>

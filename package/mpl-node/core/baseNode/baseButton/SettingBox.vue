<script lang="ts" setup>
import { ref, inject, type Ref } from 'vue'
import { newCid } from '@mpl/libs'
import FormItem from '../../../components/FormItem.vue'
import InputNode from '../../../components/InputNode.vue'
import { ButtonProp } from './define'
import FormIconItem from '../../../components/FormIconItem.vue'
import SlotNodeGroup from '../../../components/SlotNodeGroup.vue'
import { watchDebounced } from '@vueuse/core'
import FormVModel from '../../../components/FormVModel.vue'
import SliderNode from '../../../components/SliderNode.vue'
import { ADD_ACTIVE_NODE_EVENT, REMOVE_ACTIVE_NODE_EVENT } from '../../../libs'

const props = defineProps<{ value: ButtonProp }>()
const activeNode = ref<ButtonProp>(props.value)
const addActiveNodeEvent = inject(ADD_ACTIVE_NODE_EVENT) as any
const removeActiveNodeEvent = inject(REMOVE_ACTIVE_NODE_EVENT) as any

function handleRemoveClickName() {
  removeActiveNodeEvent.value({
    name: activeNode.value.clickName,
    cid: activeNode.value.cid
  })
  activeNode.value.clickName = ''
}

function openClickEventEntry() {
  if (activeNode.value.clickName) {
    // 跳转IDE或者可视化事件编辑器
  } else {
    const clickName = `mpl_btn_click_${newCid()}`
    activeNode.value.clickName = clickName
    addActiveNodeEvent({
      name: clickName,
      code: '',
      desc: '基础按钮 - 点击事件',
      cid: activeNode.value.cid
    })
  }
}

function handleRemoveVisibleName() {
  removeActiveNodeEvent({
    name: activeNode.value.visibleName,
    cid: activeNode.value.cid
  })
  activeNode.value.visibleName = ''
}

function addVisibleName() {
  if (activeNode.value.visibleName) {
    // todo
    // 画板底部显示当前组件的事件IDE可视化
  } else {
    const methodName = `mpl_btn_visible_${newCid()}`
    activeNode.value.visibleName = methodName
    addActiveNodeEvent({
      name: methodName,
      code: '',
      desc: '基础按钮 - 点击事件',
      cid: activeNode.value.cid
    })
  }
}

function handleRemoveDisabledName() {
  activeNode.value.disabledName = ''
  removeActiveNodeEvent({
    name: activeNode.value.disabledName,
    cid: activeNode.value.cid
  })
}

function addDisabledName() {
  if (activeNode.value.disabledName) {
    // todo
    // 画板底部显示当前组件的事件IDE可视化
  } else {
    const methodName = `mpl_btn_disabled_${newCid()}`
    activeNode.value.disabledName = methodName
    addActiveNodeEvent({
      name: methodName,
      code: '',
      desc: '基础按钮 - 禁用事件',
      cid: activeNode.value.cid
    })
  }
}
</script>

<template>
  <div class="right-bar-base-button--box">
    <FormItem :label="`宽度 ${activeNode.pos.pc.wType === '%' ? activeNode.pos.pc.w : ''}`">
      <SliderNode v-model:slider="activeNode.pos.pc.w" v-model:unit="activeNode.pos.pc.wType" />
    </FormItem>
    <FormItem label="显示隐藏" :var="`mpl.var.${activeNode.cid}_visible`">
      <FormVModel v-model:value="activeNode.visible" v-model:model-type="activeNode.visibleType" :tag="activeNode.tag"
        desc="显示隐藏" :option="[{ label: '显示', value: '1' }, { label: '隐藏', value: '0' }]" type="boolean" />
    </FormItem>
    <FormItem label="唯一标识" :var="activeNode.cid" />
    <FormItem label="按钮标题" var="mpl.button.dv2gr3.title">
      <InputNode v-model="activeNode.title" />
    </FormItem>
    <!-- <ButtonStyle label="样式" v-model="activeNode.btnStyle" /> -->
    <FormIconItem v-model="activeNode.icon" var="mpl.button.dv2gr3.icon" label="图标" />
    <div class="mpl-divider">按钮事件</div>
    <FormItem label="点击事件" :var="activeNode.clickName">
      <InputNode v-model="activeNode.clickName" disabled />
      <button v-if="activeNode.clickName" type="button" class="mpl-btn icon icon-close1 del-btn ml-5"
        @click="handleRemoveClickName" />
      <button type="button" class="mpl-btn icon ml-5" :class="[activeNode.clickName ? 'icon-select5' : 'icon-add']"
        @click="openClickEventEntry" />
    </FormItem>
    <FormItem label="显示/隐藏" :var="activeNode.visibleName">
      <InputNode v-model="activeNode.visibleName" disabled />
      <button v-if="activeNode.visibleName" type="button" class="mpl-btn icon icon-close1 del-btn ml-5"
        @click="handleRemoveVisibleName" />
      <button type="button" class="mpl-btn icon ml-5" :class="[activeNode.visibleName ? 'icon-select5' : 'icon-add']"
        @click="addVisibleName" />
    </FormItem>
    <FormItem label="禁用事件" :var="activeNode.disabledName">
      <InputNode v-model="activeNode.disabledName" disabled />
      <button v-if="activeNode.disabledName" type="button" class="mpl-btn icon icon-close1 del-btn ml-5"
        @click="handleRemoveDisabledName" />
      <button type="button" class="mpl-btn icon ml-5" :class="[activeNode.disabledName ? 'icon-select5' : 'icon-add']"
        @click="addDisabledName" />
    </FormItem>
    <div class="mpl-divider">关联子组件设置</div>
    <SlotNodeGroup v-model="activeNode.slotNodes" />
  </div>
</template>

<style lang="less" scoped>
.right-bar-base-button--box {
  padding: 5px;
  box-sizing: border-box;
}
</style>

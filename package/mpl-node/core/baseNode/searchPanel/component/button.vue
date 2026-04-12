<script lang="ts" setup>
import { workbenchStore } from '@mpl/store'
import type { ButtonProp } from '../../baseButton/define'
import { ref } from 'vue'
import FormItem from '../../../../components/FormItem.vue'
import FormVModel from '../../../../components/FormVModel.vue'
import InputNode from '../../../../components/InputNode.vue'
import FormIconItem from '../../../../components/FormIconItem.vue'
import { newCid } from '@mpl/libs'

const workbench = workbenchStore()
const { cid } = defineProps<{ cid: string }>()
const activeNode = ref<ButtonProp>(workbench.nodeList.find(v => v.cid === cid) as ButtonProp)


function handleRemoveClickName() {
  workbench.singleEventReduce(activeNode.value.clickName)
  activeNode.value.clickName = ''
}

function addClickName() {
  if (activeNode.value.clickName) {
    // todo
    // 画板底部显示当前组件的事件IDE可视化
  } else {
    const clickName = `mpl_btn_click_${newCid()}`
    activeNode.value.clickName = clickName
    workbench.singleNodeEventPlus({
      name: clickName,
      code: '',
      desc: '基础按钮 - 点击事件',
      cid: activeNode.value.cid,
      type: 'baseComponent',
      flowType: 'ide',
      tag: 'mpl-btn',
      open: true
    })
  }
}

function handleRemoveVisibleName() {
  workbench.singleEventReduce(activeNode.value.visibleName)
  activeNode.value.visibleName = ''
}

function addVisibleName() {
  if (activeNode.value.visibleName) {
    // todo
    // 画板底部显示当前组件的事件IDE可视化
  } else {
    const visibleName = `mpl_btn_visible_${newCid()}`
    activeNode.value.visibleName = visibleName
    workbench.singleNodeEventPlus({
      name: visibleName,
      code: '',
      desc: '基础按钮 - 点击事件',
      cid: activeNode.value.cid,
      type: 'baseComponent',
      flowType: 'ide',
      tag: 'mpl-search-panel',
      open: true
    })
  }
}

function handleRemoveDisabledName() {
  workbench.singleEventReduce(activeNode.value.disabledName)
  activeNode.value.disabledName = ''
}

function addDisabledName() {
  if (activeNode.value.disabledName) {
    // todo
    // 画板底部显示当前组件的事件IDE可视化
  } else {
    const disabledName = `mpl_btn_disabled_${newCid()}`
    activeNode.value.disabledName = disabledName
    workbench.singleNodeEventPlus({
      name: disabledName,
      code: '',
      desc: '基础按钮 - 禁用事件',
      cid: activeNode.value.cid,
      type: 'baseComponent',
      flowType: 'ide',
      tag: 'mpl-search-panel',
      open: true
    })
  }
}
</script>
<template>
  <FormItem label="显示隐藏" :var="`mpl.var.${activeNode.cid}_visible`">
    <FormVModel v-model:value="activeNode.visible" v-model:model-type="activeNode.visibleType" :tag="activeNode.tag"
      desc="显示隐藏" :option="[{ label: '显示', value: '1' }, { label: '隐藏', value: '0' }]" type="boolean" />
  </FormItem>
  <FormItem label="唯一标识" :var="activeNode.cid" />
  <FormItem label="按钮标题" :var="`mpl.button.${cid}.title`">
    <InputNode v-model="activeNode.title" />
  </FormItem>
  <FormItem label="样式" btn-ui />
  <FormIconItem v-model="activeNode.icon" var="mpl.button.dv2gr3.icon" label="图标" />
  <div class="mpl-divider">按钮事件</div>
  <FormItem label="点击事件" :var="activeNode.clickName">
    <InputNode v-model="activeNode.clickName" disabled />
    <button v-if="activeNode.clickName" type="button" class="mpl-btn icon icon-close1 del-btn ml-5" @click="handleRemoveClickName" />
    <button type="button" class="mpl-btn icon  ml-5" :class="[activeNode.clickName ? 'icon-select5' : 'icon-add']"
      @click="addClickName" />
  </FormItem>
  <FormItem label="显示/隐藏" :var="activeNode.visibleName">
    <InputNode v-model="activeNode.visibleName" disabled />
    <button v-if="activeNode.visibleName" type="button" class="mpl-btn icon icon-close1 del-btn ml-5"
      @click="handleRemoveVisibleName" />
    <button type="button" class="mpl-btn icon  ml-5" :class="[activeNode.visibleName ? 'icon-select5' : 'icon-add']"
      @click="addVisibleName" />
  </FormItem>
  <FormItem label="禁用事件" :var="activeNode.disabledName">
    <InputNode v-model="activeNode.disabledName" disabled />
    <button v-if="activeNode.disabledName" type="button" class="mpl-btn icon icon-close1 del-btn ml-5"
      @click="handleRemoveDisabledName" />
    <button type="button" class="mpl-btn icon  ml-5" :class="[activeNode.disabledName ? 'icon-select5' : 'icon-add']"
      @click="addDisabledName" />
  </FormItem>
</template>
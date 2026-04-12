<script setup lang="ts">
import FormItem from '../FormItem.vue'
import InputNode from '../InputNode.vue'
import { inject } from 'vue'
import { newCid } from '@mpl/libs'
import FormIconItem from '../FormIconItem.vue'

const activeNode = defineModel<any>()
const removeActiveNodeEvent = inject('removeActiveNodeEvent') as any

function btnClickOrGo(btn: any) {
  if (btn.click.name) {
    // todo
    // 跳转到事件IDE
  } else {
    const eventName = `input_slot_btn_click_${newCid()}`
    btn.click.name = eventName
    btn.click.code = `${eventName}() {},`
  }
}

function btnDisabledOrGo(btn: any) {
  if (btn.disabled.name) {
    // todo
    // 跳转到事件IDE
  } else {
    const eventName = `input_slot_btn_disabled_${newCid()}`
    btn.disabled.name = eventName
    btn.disabled.code = `${eventName}() {},`
  }
}

function removeClickEvent(btn: any) {
  removeActiveNodeEvent({
    name: btn.click.name
  })
  btn.click.name = ''
  btn.click.code = ''
}
function removeDisabledEvent(btn: any) {
  removeActiveNodeEvent({
    name: btn.disabled.name,
  })
  btn.disabled.name = ''
  btn.disabled.code = ''
}

function removeVisibleEvent(btn: any) {
  removeActiveNodeEvent({
    name: btn.visible.name,
  })
  btn.visible.name = ''
  btn.visible.code = ''
}

function btnVisibleOrGo(btn: any) {
  if (btn.visible.name) {
    // todo
    // 跳转到事件IDE
  } else {
    const eventName = `input_slot_btn_visible_${newCid()}`
    btn.visible.name = eventName
    btn.visible.code = `${eventName}() {},`
  }
}
</script>
<template>
  <FormIconItem v-model="activeNode.icon" label="图标" :style="{ color: activeNode.iconColor || '' }" />
  <template v-if="activeNode.icon">
    <FormItem label="图标颜色">
      <input v-model="activeNode.iconColor" type="color" class="mpl-input mr-5" autocomplete="off">
      <InputNode v-model="activeNode.iconColor" :readonly="true" />
    </FormItem>
    <FormItem var="mpl.rg5fv6.label.icon.info" label="图标信息">
      <InputNode v-model="activeNode.popoverText" />
      <button type="button" class="icon-in1 icon mpl-btn ml-5" />
    </FormItem>
  </template>
  <FormItem label="点击事件">
    <InputNode v-model="activeNode.click.name" readonly />
    <button v-if="activeNode.click.name" type="button" class="mpl-btn del-btn ml-5 icon icon-close1"
      @click="removeClickEvent(activeNode)" />
    <button type="button" class="mpl-btn ml-5 icon" :class="[activeNode.click.name ? 'icon-select5' : 'icon-add']"
      @click="btnClickOrGo(activeNode)" />
  </FormItem>
  <FormItem label="禁用事件">
    <InputNode v-model="activeNode.disabled.name" readonly />
    <button v-if="activeNode.disabled.name" type="button" class="mpl-btn del-btn ml-5 icon icon-close1"
      @click="removeDisabledEvent(activeNode)" />
    <button type="button" class="mpl-btn ml-5 icon" :class="[activeNode.disabled.name ? 'icon-select5' : 'icon-add']"
      @click="btnDisabledOrGo(activeNode)" />
  </FormItem>
  <FormItem label="显示/隐藏">
    <InputNode v-model="activeNode.visible.name" readonly />
    <button v-if="activeNode.visible.name" type="button" class="mpl-btn del-btn ml-5 icon icon-close1"
      @click="removeVisibleEvent(activeNode)" />
    <button type="button" class="mpl-btn ml-5 icon" :class="[activeNode.visible.name ? 'icon-select5' : 'icon-add']"
      @click="btnVisibleOrGo(activeNode)" />
  </FormItem>
</template>

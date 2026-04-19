<script setup lang="ts">
import { mplBtnThemeList } from '@mpl/const'
import FormItem from '../FormItem.vue'
import FormIconItem from '../FormIconItem.vue'
import InputNode from '../InputNode.vue'
import { newCid } from '@mpl/libs'
import { inject } from 'vue'

const removeActiveNodeEvent = inject('removeActiveNodeEvent') as any
const activeSlotNode = defineModel<any>()

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
  <template v-if="activeSlotNode">
    <FormItem label="标题">
      <InputNode v-model="activeSlotNode.txt" />
    </FormItem>
    <FormIconItem v-model="activeSlotNode.icon" label="图标" />
    <FormItem label="按钮主题">
      <select v-model="activeSlotNode.ui" class="mpl-select">
        <option v-for="n in mplBtnThemeList" :value="n.value">
          {{ n.label }}
        </option>
      </select>
    </FormItem>
    <FormItem label="点击事件">
      <InputNode v-model="activeSlotNode.click.name" readonly />
      <button v-if="activeSlotNode.click.name" type="button" class="mpl-btn del-btn ml-5 icon icon-close1"
        @click="removeClickEvent(activeSlotNode)" />
      <button type="button" class="mpl-btn ml-5 icon" :class="[activeSlotNode.click.name ? 'icon-select5' : 'icon-add']"
        @click="btnClickOrGo(activeSlotNode)" />
    </FormItem>
    <FormItem label="禁用事件">
      <InputNode v-model="activeSlotNode.disabled.name" readonly />
      <button v-if="activeSlotNode.disabled.name" type="button" class="mpl-btn del-btn ml-5 icon icon-close1"
        @click="removeDisabledEvent(activeSlotNode)" />
      <button type="button" class="mpl-btn ml-5 icon" :class="[activeSlotNode.disabled.name ? 'icon-select5' : 'icon-add']"
        @click="btnDisabledOrGo(activeSlotNode)" />
    </FormItem>
    <FormItem label="显示/隐藏">
      <InputNode v-model="activeSlotNode.visible.name" readonly />
      <button v-if="activeSlotNode.visible.name" type="button" class="mpl-btn del-btn ml-5 icon icon-close1"
        @click="removeVisibleEvent(activeSlotNode)" />
      <button type="button" class="mpl-btn ml-5 icon" :class="[activeSlotNode.visible.name ? 'icon-select5' : 'icon-add']"
        @click="btnVisibleOrGo(activeSlotNode)" />
    </FormItem>
  </template>
</template>
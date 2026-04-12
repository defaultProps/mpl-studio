<script lang="ts" setup>
import { ref, inject, onBeforeUnmount } from 'vue'
import FormItem from '../../../components/FormItem.vue'
import { PanelProp, panelPaddingSizeOptions } from './define'
import { VueDraggable } from 'vue-draggable-plus'
import InputNode from '../../../components/InputNode.vue'
import SliderNode from '../../../components/SliderNode.vue'
import { watchDebounced } from '@vueuse/core'
import { newCid } from '@mpl/libs'
import type { BaseBtn } from '@mpl/typings'
import { workbenchStore } from '@mpl/store'
import RadioBtnGroup from '../../../components/RadioBtnGroup.vue'

const props = defineProps<{ value: PanelProp }>()
const activeNode = ref<PanelProp>(props.value)
const activeBtn = ref<BaseBtn | null>(null)
const changeNode = inject('changeNode') as any

const workbench = workbenchStore()

// 移除辅助组件
function removeNode(cid: string, pos: number) {
  if (cid === activeBtn.value?.cid) {
    activeBtn.value = null
  }

  activeNode.value.header.slotNodes.splice(pos, 1)
  const index = workbench.nodeList.findIndex(v => v.cid === cid)
  if (index >= 0) {
    workbench.nodeList.splice(index, 1)
  }
}

function openClickEventEntry() {
  if (!activeBtn.value) return

  if (activeBtn.value.clickName) {
    // 跳转IDE或者可视化事件编辑器
  } else {
    const clickName = `mplPanelHeaderBtnClick_${newCid('panelBtn')}`
    activeBtn.value.clickName = clickName
  }
}

// 添加辅助组件
function addHeaderSlotNode() {
  const newBtn: BaseBtn = {
    title: '标题',
    icon: '',
    disabledName: '',
    clickName: '',
    visibleName: '',
    className: '',
    type: '',
    theme: 'primary',
    cid: newCid('panelBtn'),
  }
  activeNode.value.header.slotNodes.push(newBtn)
  activeBtn.value = newBtn
}

const stopWatcher = watchDebounced(activeNode.value, val => { changeNode(val) }, { debounce: 500 })

onBeforeUnmount(() => {
  stopWatcher()
})
</script>

<template>
  <div class="right-bar-setting--box">
    <FormItem :label="`宽度 ${activeNode.pos.pc.wType === '%' ? activeNode.pos.pc.w : ''}`">
      <SliderNode v-model:slider="activeNode.pos.pc.w" v-model:unit="activeNode.pos.pc.wType" />
    </FormItem>
    <FormItem label="显示顶部">
      <input v-model="activeNode.header.visible" type="checkbox" class="mpl-input">
    </FormItem>
    <FormItem label="展开关闭按钮">
      <input v-model="activeNode.header.expandable" type="checkbox" class="mpl-input">
    </FormItem>
    <FormItem label="标题底线">
      <input v-model="activeNode.header.showBorderBottom" type="checkbox" class="mpl-input">
    </FormItem>
    <template v-if="activeNode.header.visible">
      <div class="mpl-divider">顶部辅助组件</div>
      <FormItem label="顶部标题">
        <InputNode v-model="activeNode.header.label" />
      </FormItem>
      <VueDraggable v-if="activeNode.header.slotNodes.length" ref="el" v-model="activeNode.header.slotNodes"
        handle=".mpl-panel-slot" :animation="300">
        <div v-for="(item, i) in activeNode.header.slotNodes" :key="item.cid" class="slot-btn-line">
          <button type="button" class="mpl-btn mr-5 icon icon-edit5" :class="{ 'is-active': activeBtn?.cid === item.cid }"
            @click="activeBtn = item" />
          <button type="button" class="mpl-btn mr-5 icon icon-drag mpl-panel-slot" />
          <input v-model="item.title" class="mpl-input mr-5">
          <select v-model="item.theme" class="mpl-select">
            <option value="">
              默认
            </option>
            <option value="primary">
              主色
            </option>
            <option value="text">
              文本
            </option>
            <option value="link">
              链接
            </option>
          </select>
          <button type="button" class="mpl-btn del-btn ml-5 icon icon-close1" @click="removeNode(item.cid, i)" />
        </div>
      </VueDraggable>
      <button type="button" class="mpl-btn plus-btn icon icon-plus" @click="addHeaderSlotNode">
        添加按钮
      </button>
      <div v-if="activeBtn" class="slot-btn-setting">
        <FormItem label="点击事件">
          <InputNode v-model="activeBtn.clickName" disabled />
          <button v-if="activeBtn.clickName" type="button" class="mpl-btn del-btn ml-5 icon icon-close1"
            @click="openClickEventEntry" />
          <button type="button" class="mpl-btn ml-5 icon" :class="[activeBtn.clickName ? 'icon-select5' : 'icon-add']" />
        </FormItem>
        <FormItem label="显示/隐藏" :var="activeBtn.visibleName">
          <InputNode v-model="activeBtn.visibleName" disabled />
        </FormItem>
        <FormItem label="禁用变量" :var="activeBtn.disabledName">
          <InputNode v-model="activeBtn.disabledName" disabled />
        </FormItem>
        <FormItem label="自定义classname" :var="activeBtn.className">
          <InputNode v-model="activeBtn.className" />
        </FormItem>
      </div>
    </template>
    <div class="mpl-divider">内容区域设置</div>
    <FormItem label="内间距">
      <RadioBtnGroup v-model="activeNode.body.paddingSize" :option="panelPaddingSizeOptions" />
    </FormItem>
    <FormItem label="高度自适应">
      <input v-model="activeNode.body.autoHeight" type="checkbox" class="mpl-input">
    </FormItem>
  </div>
</template>

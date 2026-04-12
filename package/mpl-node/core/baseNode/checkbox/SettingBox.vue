<script lang="ts" setup>
import { ref, inject, onBeforeUnmount, onMounted } from 'vue'
import { watchDebounced } from '@vueuse/core'
import NodeLabel from '../../../components/NodeFormLabel.vue'
import { CheckboxFormProp } from './define'
import FormItem from '../../../components/FormItem.vue'
import SliderNode from '../../../components/SliderNode.vue'
import InputNode from '../../../components/InputNode.vue'
import { serviceOption } from '@mpl/const'
import RadioBtnGroup from '../../../components/RadioBtnGroup.vue'
import { VueDraggable } from 'vue-draggable-plus'
import { newCid } from '@mpl/libs'
import FormVModel from '../../../components/FormVModel.vue'
import { SERVICE_MODE } from '@mpl/const'
import NoteNode from '../../../components/NoteNode.vue'

const props = defineProps<{ value: CheckboxFormProp }>()
const activeNode = ref<CheckboxFormProp>(props.value)
const changeNode = inject('changeNode') as any
const stopWatcher = watchDebounced(activeNode.value, val => { changeNode(val) }, { debounce: 500 })

function removeItem(pos: any) {
  activeNode.value.checkbox.service.staticData.splice(pos, 1)
}

onBeforeUnmount(() => {
  stopWatcher()
})

function addServiceData() {
  activeNode.value.checkbox.service.staticData.push({
    [activeNode.value.checkbox.service.labelKey]: '显示值' + (activeNode.value.checkbox.service.staticData.length + 1),
    [activeNode.value.checkbox.service.valueKey]: newCid()
  })
}

function addServiceCustomAPI() {
  const methodName = `mpl_getCheckboxList_${activeNode.value.cid}`
  activeNode.value.checkbox.service.methodName = methodName
  activeNode.value.checkbox.service.methodCode = `
    async ${methodName}() {
      return []
    }
  `
}
</script>
<template>
  <div class="right-bar-setting--box">
    <FormItem :label="`宽度 ${activeNode.pos.pc.wType === '%' ? activeNode.pos.pc.w : ''}`">
      <SliderNode v-model:slider="activeNode.pos.pc.w" v-model:unit="activeNode.pos.pc.wType" />
    </FormItem>
    <FormItem label="显示隐藏" :var="`mpl.var.${activeNode.cid}_visible`">
      <FormVModel v-model:value="activeNode.visible" v-model:model-type="activeNode.visibleType" :tag="activeNode.tag"
        desc="显示隐藏" :option="[{ label: '显示', value: '1' }, { label: '隐藏', value: '0' }]" type="boolean" />
    </FormItem>
    <FormItem label="唯一标识" :var="activeNode.cid" cid />
    <NodeLabel v-model="activeNode.label" v-model:mpl_zh="activeNode.mpl_zh" :cid="activeNode.cid" />
    <div class="mpl-divider">多选框配置</div>
    <FormItem label="提示信息" var="mpl.rg5fv6.input.placeholder">
      <InputNode v-model="activeNode.checkbox.placeholder" />
    </FormItem>
    <FormItem label="必填">
      <input v-model="activeNode.checkbox.required" type="checkbox" class="mpl-input">
    </FormItem>
    <div class="mpl-divider">数据管理</div>
    <FormItem label="数据类型">
      <RadioBtnGroup v-model="activeNode.checkbox.service.mode" :option="serviceOption" />
    </FormItem>
    <FormItem label="选中变量" :var="`mpl.var.checkbox.${activeNode.cid}.vModel`" cid />
    <FormItem label="多选项" :var="`mpl.var.checkbox.${activeNode.cid}.options`" cid />
    <!-- 静态数据 -->
    <div class="mpl-sub-form-block">
      <template v-if="activeNode.checkbox.service.mode === SERVICE_MODE.STATIC">
        <div class="flex-end mb-5">
          <div style="margin-right: 56px">显示值</div>
          <div style="margin-right: 22px">保存值</div>
          <button type="button" class="mpl-btn mr-5 icon icon-upload2" />
          <button type="button" class="mpl-btn icon del-btn icon icon-close1" />
        </div>
        <VueDraggable v-if="activeNode.checkbox.service.staticData.length"
          v-model="activeNode.checkbox.service.staticData" :animation="300"
          handle=".mpl-baseInput-slotBtn-sort-handler">
          <div v-for="(item, i) in activeNode.checkbox.service.staticData" :key="i" class="service-static-item">
            <button type="button" class="mpl-btn mr-5 icon icon-drag mpl-baseInput-slotBtn-sort-handler" />
            <input type="checkbox" class="mpl-input">
            <InputNode v-model="item[activeNode.checkbox.service.labelKey]" class="ml-5 mr-5" />
            <InputNode v-model="item[activeNode.checkbox.service.valueKey]" />
            <button type="button" class="mpl-btn del-btn ml-5 icon icon-close1" @click="removeItem(i)" />
          </div>
        </VueDraggable>
        <button type="button" class="mpl-btn plus-btn icon icon-plus" @click="addServiceData">
          添加组件
        </button>
      </template>
      <!-- 动态数据 -->
      <template v-else-if="activeNode.checkbox.service.mode === SERVICE_MODE.DYNAMICS">
        <FormItem label="选择接口">
          <input v-model="activeNode.checkbox.service.postman.url" disabled class="mpl-input">
          <button type="button" class="mpl-btn ml-5 icon icon-select5" />
        </FormItem>
      </template>
      <!-- 自定义方法 -->
      <template v-else-if="activeNode.checkbox.service.mode === SERVICE_MODE.CUSTOM">
        <FormItem label="自定义方法" flex-end>
          <input v-model="activeNode.checkbox.service.methodName" disabled class="mpl-input">
          <button v-if="activeNode.checkbox.service.methodCode" type="button"
            class="mpl-btn ml-5 icon del-btn icon-close" />
          <button v-if="!activeNode.checkbox.service.methodName" type="button" class="mpl-btn ml-5 icon icon-plus"
            @click="addServiceCustomAPI" />
          <button v-else type="button" class="mpl-btn ml-5 icon icon-select5" />
        </FormItem>
      </template>
    </div>
    <div class="mpl-divider">注解设置</div>
    <NoteNode v-model="activeNode.note" />
  </div>
</template>

<style lang="less">
.right-bar-setting--box {
  .service-static-item {
    display: flex;
    height: 28px;
    line-height: 28px;
  }
}
</style>

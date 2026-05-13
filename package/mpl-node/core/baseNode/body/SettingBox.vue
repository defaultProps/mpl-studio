<script lang="ts" setup>
import { ref, useId } from 'vue'
import FormItem from '../../../components/FormItem.vue'
import InputNode from '../../../components/InputNode.vue'
import { newCid } from '@mpl/libs'
import { VueDraggable } from 'vue-draggable-plus'
import { InteractiveProp, SUB_BOX_SETTING_MODEL } from '@mpl/typings'
import CustomVar from '../../../components/subSettingBox/CustomVar.vue'
import ComputedVar from '../../../components/subSettingBox/ComputedVar.vue'
import Interactive from '../../../components/subSettingBox/Interactive.vue'
import { viewStore } from '@mpl/store'


const color = ref('#ffffff')
const visibleCustomVarDialog = ref(false)
const visibleComputedVarDialog = ref(false)
const visibleInteractiveDialog = ref(false)
const id = useId()
const view = viewStore()

const bodyNode = ref({
  layout: '默认布局',
  note: true,
})
interface CustomVarItem {
  label: string
  value: string
  callback: string
}

// 自定义变量
const customVarList = ref([
  {
    label: '用户名',
    value: 'customVar1',
    callback: 'console.log("自定义变量1")',
  },
])
const activeCustomVar = ref<CustomVarItem | null>(null)
function removeCustomVar(i: number) {
  customVarList.value.splice(i, 1)
}
function updateCustomVar(type: 'edit' | 'add' | 'cancel') {
  //
}

const computedVars = ref([
  {
    label: '用户名',
    value: 'customVar2',
    callback: 'console.log("自定义变量1")',
  },
])
const activeComputedVar = ref<CustomVarItem | null>(null)
function removeComputedVar(i: number) {
  computedVars.value.splice(i, 1)
}
function updateComputedVar(type: 'edit' | 'add' | 'cancel') {
  //
}

/// 提交前执行
const beforeSubmitInteractiveList = ref<InteractiveProp[]>(
  [
    { label: '校验表单组件', value: '', message: '', code: '', params: [] },
  ]
)
const activeInteractive = ref<InteractiveProp | null>(null)
function updateInteractive(type: 'edit' | 'add' | 'cancel') {
  //
}
function removeInteractive(i: number) {
  beforeSubmitInteractiveList.value.splice(i, 1)
}

function changeSubBoxSetting(model: SUB_BOX_SETTING_MODEL) {
  view.$patch({
    subBoxSettingModel: model,
    subBoxSettingModelId: model === '' ? '' : id
  })
}
</script>
<template>
  <div class="right-bar-setting--box">
    <div class="mpl-divider">页面设置</div>
    <FormItem label="背景颜色">
      <InputNode v-model="color" />
    </FormItem>
    <FormItem label="页面布局">
      <InputNode v-model="bodyNode.layout" disabled />
      <button type="button" class="mpl-btn ml-5 icon icon-select5" />
    </FormItem>
    <div class="mpl-divider">自定义变量</div>
    <div v-for="(item, i) in customVarList" class="flex item-line">
      <InputNode v-model="item.label" disabled />
      <InputNode v-model="item.value" disabled class="ml-5" />
      <InputNode v-model="item.value" disabled class="ml-5" />
      <button type="button" :class="{ 'is-active': item.value === activeCustomVar?.value }"
        class="mr-5 mpl-btn icon icon-edit5" @click="activeCustomVar = item" />
      <button type="button" class="ml-5 mpl-btn del-btn icon icon-close" @click="removeCustomVar(i)" />
    </div>
    <button type="button" class="mpl-btn plus-btn icon icon-plus" :disabled="customVarList.length >= 20"
      @click="changeSubBoxSetting('customVar')">
      添加
    </button>
    <div class="mpl-divider">自动计算变量</div>
    <div v-for="(item, i) in computedVars" class="flex var-item">
      <button type="button" :class="{ 'is-active': item.value === activeComputedVar?.value }"
        class="mr-5 mpl-btn icon icon-select5" @click="activeComputedVar = item" />
      <InputNode v-model="item.label" disabled />
      <InputNode v-model="item.value" disabled class="ml-5" />
      <button type="button" class="ml-5 mpl-btn del-btn icon icon-close" @click="removeComputedVar(i)" />
    </div>
    <button type="button" class="mpl-btn mt-5 plus-btn icon icon-plus" :disabled="computedVars.length >= 20"
      @click="changeSubBoxSetting('computedVar')">
      添加
    </button>
    <div class="mpl-divider">提交前执行</div>
    <VueDraggable v-if="beforeSubmitInteractiveList.length" v-model="beforeSubmitInteractiveList" :animation="300"
      handle=".mpl-baseInput-slotBtn-sort-handler">
      <div v-for="(item, i) in beforeSubmitInteractiveList" :key="item.value" class="flex item-line">
        <button type="button" class="mpl-btn mr-5 icon icon-select5"
          :class="{ 'is-active': activeInteractive?.value === item.value }" @click="activeInteractive = item" />
        <InputNode v-model="item.label" disabled />
        <button type="button" class="mpl-btn ml-5 del-btn icon icon-close1" @click="removeInteractive(i)" />
      </div>
      <button type="button" class="mpl-btn plus-btn icon icon-plus" :disabled="beforeSubmitInteractiveList.length >= 20"
        @click="changeSubBoxSetting('interactive')">
        添加
      </button>
    </VueDraggable>
    <FormItem label="提交后执行">
      draggable 顺序执行
    </FormItem>
    <FormItem label="页面渲染前" wrap tooltip="在页面未渲染前执行，通常执行变量赋值，服务请求，清空页面校验状态等操作">
      draggable 顺序执行
    </FormItem>
    <FormItem label="页面挂载后" tooltip="在页面挂载完成后执行，通常是执行DOM节点操作">
      draggable 顺序执行
    </FormItem>
    <Interactive
      v-if="view.subBoxSettingModel === 'interactive' && view.subBoxSettingModelId === id && activeInteractive"
      v-model="activeInteractive" @update="updateInteractive" @cancel="changeSubBoxSetting('')" />
    <CustomVar v-if="view.subBoxSettingModel === 'customVar' && view.subBoxSettingModelId === id"
      v-model="activeCustomVar" @update="updateCustomVar" @cancel="changeSubBoxSetting('')" />
    <ComputedVar
      v-if="view.subBoxSettingModel === 'computedVar' && view.subBoxSettingModelId === id && activeComputedVar"
      v-model="activeComputedVar" @update="updateComputedVar" @cancel="changeSubBoxSetting('')" />
  </div>
</template>

<style lang="less" scoped>
.item-line {
  height: 30px;
}
</style>

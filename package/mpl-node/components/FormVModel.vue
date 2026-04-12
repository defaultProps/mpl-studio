<script lang="ts" setup>
import InputNode from './InputNode.vue'
import ModelAPI from './subSettingBox/ModelAPI.vue'
import { viewStore } from '@mpl/store'
import type { NODE_TAG, SENIOR_TAG, SUB_BOX_SETTING_MODEL } from '@mpl/typings'
import { useId } from 'vue'

const view = viewStore()
const modelType = defineModel<string>('modelType')
const model = defineModel<string>('value')
const props = defineProps<{
  type: string
  desc: string
  tag: NODE_TAG | SENIOR_TAG
  option?: any[]
}>()
const id = useId()

function resetDefaultValue() {
  model.value = ''

  if (view.subBoxSettingModelId === id) {
    view.$patch({
      subBoxSettingModel: ''
    })
  }
}

function clickNode(node: any) {

}

function openSubSettingBox(model: SUB_BOX_SETTING_MODEL) {
  view.$patch({
    subBoxSettingModel: model,
    subBoxSettingModelId: model === '' ? '' : id
  })
}
</script>

<template>
  <select v-model="modelType" class="mpl-select" style="max-width: 70px;width: 70px;" @change="resetDefaultValue">
    <option value="default">
      固定值
    </option>
    <option value="custom">
      公式计算
    </option>
  </select>
  <select v-if="props.option && modelType === 'default'" class="mpl-select ml-5">
    <option v-for="item in props.option" :value="item.value">
      {{ item.label }}
    </option>
  </select>
  <InputNode v-else v-model="model" class="ml-5" :readonly="modelType === 'custom'" />
  <button v-if="modelType === 'custom'" class="mpl-btn icon icon-select5 ml-5" type="button"
    :class="{ 'is-active': view.subBoxSettingModel === 'clientAPI' && view.subBoxSettingModelId === id }"
    @click="openSubSettingBox('clientAPI')" />
  <ModelAPI v-if="view.subBoxSettingModel === 'clientAPI' && view.subBoxSettingModelId === id" :type="props.type"
    :tag="props.tag" :desc="props.desc" @node-click="clickNode" @close="openSubSettingBox('')" />
</template>
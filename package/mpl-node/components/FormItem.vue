<script setup lang="ts">
import { ref, useId } from 'vue'
import LayoutSelect from './LayoutSelect.vue'
import RadioBtnGroup from './RadioBtnGroup.vue'
import { layouts } from '@mpl/node'
import { viewStore } from '@mpl/store'
import type { SUB_BOX_SETTING_MODEL } from '@mpl/typings'
import { useThrottleFn } from '@vueuse/core'

const view = viewStore()
const id = useId()
const props = defineProps<{
  label?: string
  var?: string
  placement?: string
  cid?: boolean
  hiddenLabel?: boolean
  flexEnd?: boolean
  flexStart?: boolean
  layout?: boolean // 排版类型
  service?: boolean // 服务类型
  serviceType?: string // 服务值
  initVal?: boolean // v-model绑定初始值
  modelValue?: string // v-model绑定值
}>()
const emit = defineEmits(['change', 'update:serviceType', 'update:modelValue'])
const modelValue = ref<string>(props.modelValue || '')
const currentServiceType = ref('static')
const isCopy = ref(false)
const visibleTooltip = ref(false)

// 复制操作
const onCopy = useThrottleFn((text: string) => {
  if(isCopy.value) {
    return
  }
  navigator.clipboard.writeText(text)
  isCopy.value = true
  setTimeout(() => {
    isCopy.value = false
  }, 300)
}, 300)

function changeVModel(val: string) {
  modelValue.value = val
  emit('update:modelValue', val)
  emit('change', val)
  if (view.subBoxSettingModel === 'iconSelect' && view.subBoxSettingModelId === id) {
    changeSubBoxSetting('')
  }
}

function formatLayoutLabel(val: string): string {
  let str = ''

  layouts.find(v => {
    const index = v.category.findIndex(v => v.value == val)

    if (index >= 0) {
      str = `${v.label}[${val}]`
    }
  })

  return str
}

function changeLayout(layout: string) {
  layouts.find(v => {
    const index = v.category.findIndex(v => v.value == layout)

    if (index >= 0) {
      modelValue.value = `${v.label}[${layout}]`
      emit('update:modelValue', modelValue.value)
    }
  })
  modelValue.value = layout
  emit('update:modelValue', layout)
  emit('change', layout)
  changeSubBoxSetting('')
}

function changeSubBoxSetting(model: SUB_BOX_SETTING_MODEL) {
  view.$patch({
    subBoxSettingModel: model,
    subBoxSettingModelId: model === '' ? '' : id
  })
}
</script>

<template>
  <div class="form-item-node" :class="{ 'flex-start-content': props.flexStart }">
    <template v-if="props.hiddenLabel !== true">
      <span v-if="props.var"
        v-tooltip.left="{ content: isCopy ? '已复制' : props.var, shown: visibleTooltip, triggers: [], autoHide: false }"
        class="label var" @mouseenter.stop="visibleTooltip = true" @mouseleave.stop="visibleTooltip = false"
        @click.stop="onCopy(props.var)">
        {{ props.label }}
      </span>
      <span v-else class="label">{{ props.label }}</span>
    </template>
    <input v-if="props.cid" type="text" class="mpl-input" :value="props.var" readonly autocomplete="off"
      maxlength="100">
    <div v-else-if="props.layout" class="layout-line">
      <LayoutSelect v-if="view.subBoxSettingModel === 'boxLayout'" v-model="modelValue" @change="changeLayout"
        @cancel="changeSubBoxSetting('')" />
      {{ formatLayoutLabel(modelValue || '') }}
      <button v-if="modelValue && !props.layout" type="button" class="mpl-btn mr-5 del-btn icon icon-close1"
        @click="changeVModel('')" />
      <button class="mpl-btn edit-btn icon icon-select5" type="button"
        :class="{ 'is-active': view.subBoxSettingModel === 'boxLayout' && view.subBoxSettingModelId === id }"
        @click="changeSubBoxSetting('boxLayout')" />
    </div>
    <template v-else-if="props.service">
      <RadioBtnGroup v-model="currentServiceType" style="flex: 1" :option="[]"
        @update="emit('update:serviceType', currentServiceType)" />
      <slot />
    </template>
    <div v-else-if="props.flexEnd" class="flex-end">
      <slot />
    </div>
    <slot v-else />
  </div>
</template>

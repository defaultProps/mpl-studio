<script setup lang="ts">
import { ref, useId } from 'vue'
import LayoutSelect from './LayoutSelect.vue'
import RadioBtnGroup from './RadioBtnGroup.vue'
import { layouts } from '@mpl/node'
import { viewStore } from '@mpl/store'
import type { SUB_BOX_SETTING_MODEL } from '@mpl/typings'

const view = viewStore()
const id = useId()
const props = defineProps<{
  label?: string
  var?: string
  placement?: string
  cid?: boolean
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
function onCopy(text: string) {
  navigator.clipboard.writeText(text)
  isCopy.value = true
  setTimeout(() => {
    isCopy.value = false
  }, 300)
}

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
  <div class="form-item-node">
    <span class="label">{{ props.label }}</span>
    <button class="btn-style" type="button">
      按钮样式
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, useId } from 'vue'
import IconSelect from './subSettingBox/IconSelect.vue'
import { viewStore } from '@mpl/store'
import type { SUB_BOX_SETTING_MODEL } from '@mpl/typings'
import * as LucideVueNext from 'lucide-vue-next'

const view = viewStore()
const id = useId()
const modelValue = defineModel<string>('modelValue', { default: '' })
const props = defineProps<{ label: string; var?: string }>()

function changeIcon(icon: string) {
  modelValue.value = icon
  if (view.subBoxSettingModel === 'iconSelect' && view.subBoxSettingModelId === id) {
    changeSubBoxSetting('')
  }
}

function changeSubBoxSetting(model: SUB_BOX_SETTING_MODEL) {
  view.$patch({
    subBoxSettingModel: model,
    subBoxSettingModelId: model === '' ? '' : id
  })
}

const isCopy = ref(false)
const visibleTooltip = ref(false)

function onCopy(text: string) {
  navigator.clipboard.writeText(text)
  isCopy.value = true
  setTimeout(() => {
    isCopy.value = false
  }, 300)
}

const getIconComponent = (name: any) => {
  return LucideVueNext[name]
};
</script>

<template>
  <div class="form-item-node">
    <div class="form-item--label" style="color: #000">
      <span v-if="props.var"
        v-tooltip.left="{ content: isCopy ? '已复制' : props.var, shown: visibleTooltip, triggers: [], autoHide: false }"
        class="label var" @mouseenter.stop="visibleTooltip = true" @mouseleave.stop="visibleTooltip = false"
        @click.stop="onCopy(props.var)">
        {{ props.label }}
      </span>
      <span v-else class="label">{{ props.label }}</span>
    </div>
    <IconSelect v-if="view.subBoxSettingModel === 'iconSelect' && view.subBoxSettingModelId === id" v-model="modelValue"
      @change="changeIcon" @cancel="changeSubBoxSetting('')" />
    <span class="mpl-icon-view">
      <component :is="getIconComponent(modelValue)" style="width: 22px;" />
    </span>
    <button v-if="modelValue" type="button" class="mpl-btn mr-5 del-btn icon icon-close1" @click="changeIcon('')" />
    <button type="button" class="mpl-btn edit-btn icon icon-select5"
      :class="{ 'is-active': view.subBoxSettingModel === 'iconSelect' && view.subBoxSettingModelId === id }"
      @click="changeSubBoxSetting('iconSelect')" />
  </div>
</template>

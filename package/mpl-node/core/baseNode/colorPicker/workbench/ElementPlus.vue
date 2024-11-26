<script lang="ts" setup>
import { ref, watch } from 'vue'
import { formContentPosClassName, labelPosWithClassName } from '../../../../libs'
import { ColorPickerFormProp, ColorPickerNode } from '../define'

const props = defineProps<{ node: ColorPickerFormProp }>()
const colorPicker = ref<ColorPickerNode>(props.node.colorPicker)
const colorPickerValue = ref<string>(props.node.colorPicker.model)

watch(
  () => props.node.colorPicker.model,
  (value: any) => {
    colorPickerValue.value = value
  },
)
</script>

<template>
  <el-form-item theme="mpl" :required="colorPicker.required" class="mpl-form-item" :cid="props.node.cid"
    :class="[{ 'mpl-none': !props.node.label.show }, labelPosWithClassName.get(props.node.label.pos)]"
    :label-width="props.node.label.width === 0 ? 80 : props.node.label.width">
    <template #label>
      <div v-show="props.node.label.show" class="mpl-label">
        <span :title="props.node.label.text">
          {{ props.node.label.text }}
        </span>
        <div v-if="props.node.label.icon" class="mpl-label-icon">
          <i class="mpl icon" :class="[props.node.label.icon]" :style="{ color: props.node.label.iconTheme }" />
        </div>
      </div>
    </template>
    <div class="mpl-content" :class="[formContentPosClassName.get(colorPicker.pos)]">
      <el-color-picker v-model="colorPickerValue" />
    </div>
  </el-form-item>
</template>

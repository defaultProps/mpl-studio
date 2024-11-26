<script lang="ts" setup>
import { ref, watch } from 'vue'
import { formContentPosClassName, labelPosWithClassName } from '../../../../libs'
import { TimePickerFormProp, TimePickerNode } from '../define'

const props = defineProps<{ node: TimePickerFormProp }>()
const mplSwitch = ref<TimePickerNode>(props.node.timePicker)
const timePickerValue = ref<string>(props.node.timePicker.model)

watch(
  () => props.node.timePicker.model,
  (value: any) => {
    timePickerValue.value = value
  },
)
</script>

<template>
  <el-form-item theme="mpl" :required="mplSwitch.required" class="mpl-form-item" :cid="props.node.cid"
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
    <div class="mpl-content" :class="[formContentPosClassName.get(mplSwitch.pos)]">
      <el-time-picker v-model="timePickerValue" />
    </div>
  </el-form-item>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { formContentPosClassName, labelPosWithClassName } from '../../../../libs'
import { DatePickerFormProp, DatePickerNode } from '../define'

const props = defineProps<{ node: DatePickerFormProp }>()
const mplSwitch = ref<DatePickerNode>(props.node.datePicker)
const datePickerValue = ref<string>(props.node.datePicker.model)

watch(
  () => props.node.datePicker.model,
  (value: any) => {
    datePickerValue.value = value
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
      <el-date-picker v-model="datePickerValue" class="mpl-date-picker" placeholder="日期选择" />
    </div>
  </el-form-item>
</template>

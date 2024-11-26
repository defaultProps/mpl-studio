<script lang="ts" setup>
import { ref, watch } from 'vue'
import { formContentPosClassName, labelPosWithClassName } from '../../../../libs'
import { DateRangePickerFormProp, DateRangePickerNode } from '../define'

const props = defineProps<{ node: DateRangePickerFormProp }>()
const dateRangePicker = ref<DateRangePickerNode>(props.node.dateRangePicker)
const dateRangePickerValue = ref<string[] | Date[] | number[] | null>(props.node.dateRangePicker.model)

watch(
  () => props.node.dateRangePicker.model,
  (value: any) => {
    dateRangePickerValue.value = value
  },
)
</script>

<template>
  <el-form-item theme="mpl" :required="dateRangePicker.required" class="mpl-form-item" :cid="props.node.cid"
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
    <div class="mpl-content" :class="[formContentPosClassName.get(dateRangePicker.pos)]">
      <el-date-picker v-model="dateRangePickerValue" type="datetimerange" start-placeholder="开始日期"
        end-placeholder="结束日期" />
    </div>
  </el-form-item>
</template>

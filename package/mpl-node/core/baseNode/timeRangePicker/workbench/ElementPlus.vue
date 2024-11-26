<script lang="ts" setup>
import { ref, watch } from 'vue'
import { formContentPosClassName, labelPosWithClassName } from '../../../../libs'
import { TimeRangePickerFormProp, TimeRangePickerNode } from '../define'

const props = defineProps<{ node: TimeRangePickerFormProp }>()
const mplSwitch = ref<TimeRangePickerNode>(props.node.timeRangePicker)
const timeRangePickerValue = ref<null | string[]>(props.node.timeRangePicker.model)

watch(
  () => props.node.timeRangePicker.model,
  (value: any) => {
    timeRangePickerValue.value = value
  },
)
</script>

<template>
  <el-form-item
    theme="mpl"
    :required="mplSwitch.required"
    class="mpl-form-item"
    :cid="props.node.cid"
    :class="[{ 'mpl-none': !props.node.label.show }, labelPosWithClassName.get(props.node.label.pos)]"
    :label-width="props.node.label.width === 0 ? 80 : props.node.label.width"
  >
    <template #label>
      <div
        v-show="props.node.label.show"
        class="mpl-label"
      >
        <span :title="props.node.label.text">
          {{ props.node.label.text }}
        </span>
        <div
          v-if="props.node.label.icon"
          class="mpl-label-icon"
        >
          <i
            class="mpl icon"
            :class="[props.node.label.icon]"
            :style="{ color: props.node.label.iconTheme }"
          />
        </div>
      </div>
    </template>
    <div
      class="mpl-content"
      :class="[formContentPosClassName.get(mplSwitch.pos)]"
    >
      <el-time-picker
        v-model="timeRangePickerValue"
        is-range
        mpl
        range-separator="至"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
      />
    </div>
  </el-form-item>
</template>

<style lang="less">
  .el-range-editor.el-input__wrapper.el-date-editor--datetimerange {
    width: 100%;
    padding: 0 5px;
    box-sizing: border-box;
    input.el-range-input {
      width: 140px;
    }
  }
</style>

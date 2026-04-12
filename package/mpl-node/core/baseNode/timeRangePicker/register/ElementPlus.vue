<script lang="ts" setup>
import { formContentPosClassName, labelPosWithClassName } from '../../../../libs'
import type { TimeRangePickerFormProp } from '../define'
import SlotRenderNode from '../../../../components/SlotRenderNode.vue'

const el = defineModel<TimeRangePickerFormProp>()
const props = defineProps<{ w: string | number, h: number | string }>()
</script>

<template>
  <template v-if="el">
    <el-form-item theme="mpl" :required="el.timeRangePicker.required" class="mpl-form-item" :cid="el.cid"
      :prop="el.timeRangePicker.prop"
      :class="[{ 'mpl-none': !el.label.show }, `w-${props.w}`, `h-${props.h}`, labelPosWithClassName.get(el.label.pos)]"
      :label-width="el.label.width === 0 ? 80 : el.label.width">
      <template #label>
        <div v-show="el.label.show" class="mpl-label">
          <span :title="el.label.text">
            {{ el.label.text }}
          </span>
          <div v-if="el.label.icon" class="mpl-label-icon">
            <i class="mpl icon" :class="[el.label.icon]" :style="{ color: el.label.iconTheme }" />
          </div>
        </div>
      </template>
      <div class="mpl-content" :class="[formContentPosClassName.get(el.timeRangePicker.pos)]">
        <el-time-picker v-model="el.timeRangePicker.model" is-range mpl range-separator="至" start-placeholder="开始时间"
          end-placeholder="结束时间" />
      </div>
      <template #error>
        <div class="mpl-form-item-error">
          错误信息提示
        </div>
      </template>
    </el-form-item>
  </template>
</template>

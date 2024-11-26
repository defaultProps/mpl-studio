<script lang="ts" setup>
import { ref, watch } from 'vue'
import { formContentPosClassName, labelPosWithClassName } from '../../../../libs'
import { SliderFormProp, SliderNode } from '../define'

const props = defineProps<{ node: SliderFormProp }>()
const slider = ref<SliderNode>(props.node.slider)
const sliderValue = ref<number>(props.node.slider.model)

watch(
  () => props.node.slider.model,
  (value: any) => {
    sliderValue.value = value
  },
)
</script>

<template>
  <el-form-item theme="mpl" :required="slider.required" class="mpl-form-item" :cid="props.node.cid"
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
    <div class="mpl-content" :class="[formContentPosClassName.get(slider.pos)]" style="pointer-events: none">
      <el-slider v-model="sliderValue" />
    </div>
    <template #error>
      <div class="mpl-form-item-error">
        错误信息提示
      </div>
    </template>
  </el-form-item>
</template>

<style lang="less">
.service-dynamic {
  width: 100%;
  text-align: center;
  user-select: none;
  color: #666;
  font-size: 12px;
}
</style>

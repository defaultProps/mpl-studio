<script setup lang="ts">
import InputNode from './InputNode.vue'
import type { LEN_UNIT_TYPE } from '@mpl/typings'

const props = withDefaults(defineProps<{ min?: number; max?: number, isHeight?: boolean, isNumber?: boolean }>(), {
  min: 1,
  max: 24,
  isHeight: false,
  isNumber: false
})
const vModel = defineModel<number | string>('slider', { default: 24 })
const vModelType = defineModel<LEN_UNIT_TYPE>('unit', { default: '%' })

function changeSlider(e: any) {
  vModel.value = +e.target.value
}

function increase() {
  vModel.value = +vModel.value + 1
}
function decrease() {
  vModel.value = +vModel.value - 1
}

function changeIsUnitRange() {
  if (props.isHeight || props.isNumber) {
    return
  }

  vModel.value = vModelType.value === '%' ? 8 : '600px' // 默认600px
}
</script>

<template>
  <template v-if="props.isNumber">
    <button type="button" class="mpl-btn mr-5" style="width: 28px">
      {{ vModel }}
    </button>
    <input :value="vModel" :min="props.min" :max="props.max" type="range" style="width: 99px" class="mpl-slider"
      autocomplete="off" @change="changeSlider">
    <button type="button" class="mpl-btn ml-5 ml-10 icon icon-line" :disabled="+vModel <= 0" @click="decrease" />
    <button type="button" class="mpl-btn ml-5 icon icon-add" :disabled="+vModel >= 100" @click="increase" />
  </template>
  <template v-else>
    <!-- 插槽容器中, 此属性是无效的 -->
    <select v-model="vModelType" class="mpl-select mr-5" style="max-width: 50px; min-width: 50px;"
      @change="changeIsUnitRange">
      <option value="%">比例</option>
      <option value="px">像素</option>
      <!--
        快捷配置, 不需要设置基础容器包裹，直接通过自动计算占据宽度。
        使用的css并不是flex-1, 而是width: calc(100% - (100% / 24 * 4 + ...多个计算节点)))
      -->
      <option disabled value="flex-row">单行占满</option>
    </select>
    <template v-if="vModelType === '%' && !props.isHeight">
      <input :value="vModel" :min="props.min" :max="props.max" type="range" class="mpl-slider" autocomplete="off"
        @change="changeSlider">
      <button type="button" class="mpl-btn ml-5 ml-10 icon icon-line" :disabled="+vModel === 1" @click="decrease" />
      <button type="button" class="mpl-btn ml-5 icon icon-add" :disabled="+vModel === 24" @click="increase" />
    </template>
    <template v-else-if="vModelType === 'px' || props.isHeight">
      <InputNode v-model="vModel" placeholder="默认单位px" />
    </template>
  </template>
</template>

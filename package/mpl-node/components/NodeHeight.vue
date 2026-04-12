<script setup lang="ts">
import InputNode from './InputNode.vue'
import type { LEN_UNIT_TYPE } from '@mpl/typings'

const props = withDefaults(defineProps<{ min?: number; max?: number, isHeight?: boolean, isNumber?: boolean }>(), {
  min: 1,
  max: 24,
  isHeight: false,
  isNumber: false
})
const vModel = defineModel<number>('slider', { default: 24 })
const vModelType = defineModel<LEN_UNIT_TYPE>('unit', { default: '%' })

function changeSlider(e: any) {
  vModel.value = e.target.value
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

  vModelType.value = vModelType.value === '%' ? 'px' : '%'
  vModel.value = vModelType.value === 'px' ? 24 : 600 // 默认600px
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
    <button type="button" class="mpl-btn mr-5 text-btn" @click="changeIsUnitRange"> 
      {{ vModelType === '%' ? '比例' : '像素' }}
    </button>
    <template v-if="vModelType === '%' && !props.isHeight">
      <input :value="vModel" :min="props.min" :max="props.max" type="range" style="width: 80px" class="mpl-slider"
        autocomplete="off" @change="changeSlider">
      <button type="button" class="mpl-btn ml-5 ml-10 icon icon-line" :disabled="+vModel === 1" @click="decrease" />
      <button type="button" class="mpl-btn ml-5 icon icon-add" :disabled="+vModel === 24" @click="increase" />
    </template>
    <template v-else-if="vModelType === 'px' || props.isHeight">
      <InputNode v-model="vModel" placeholder="默认占满宽度" />
    </template>
  </template>
</template>

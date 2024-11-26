<script setup lang="ts">
  import { ref } from 'vue'

  const props = withDefaults(defineProps<{ modelValue: number | string, min?: number, max?: number }>(), {
    modelValue: 24,
    min: 1,
    max: 24,
  })
  const emit = defineEmits(['update:modelValue'])
  const modelInput = ref<number>(+props.modelValue)

  function changeSlider(e: any) {
    emit('update:modelValue', e.target.value)
    modelInput.value = e.target.value
  }

  function increase() {
    modelInput.value = +modelInput.value + 1
    emit('update:modelValue', modelInput.value)
  }
  function decrease() {
    modelInput.value = +modelInput.value - 1

    emit('update:modelValue', modelInput.value)
  }
</script>

<template>
  <input v-model="modelInput" :min="props.min" :max="props.max" type="range" class="mpl-slider" @input="changeSlider">
  <button class="mpl-btn ml-5 ml-10 icon icon-line" :disabled="+modelInput === 1" @click="decrease" />
  <button class="mpl-btn ml-5 icon icon-add3" :disabled="+modelInput === 24" @click="increase" />
</template>

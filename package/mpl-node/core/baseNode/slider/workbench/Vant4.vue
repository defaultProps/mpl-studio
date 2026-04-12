<script lang="ts" setup>
import { ref, watch } from 'vue'
import { SliderFormProp } from '../define'

const props = defineProps<{ node: SliderFormProp }>()
const defaultValue = ref<number>(props.node.slider.model)

watch(
  () => props.node.slider.model,
  (value: number) => {
    defaultValue.value = value
  }
)
</script>

<template>
  <van-field :value="defaultValue" type="number" label-align="top" clearable class="mpl-no-pointer">
    <template #label>
      {{ props.node.label.text }}
    </template>
    <template #input>
      <van-slider v-model="defaultValue" bar-height="4px" active-color="#196eff" />
    </template>
  </van-field>
</template>

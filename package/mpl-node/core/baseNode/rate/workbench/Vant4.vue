<script lang="ts" setup>
import { ref, watch } from 'vue'
import { RateFormProp } from '../define'

const props = defineProps<{ node: RateFormProp }>()
const defaultValue = ref<number>(props.node.rate.model)

watch(
  () => props.node.rate.model,
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
      <van-rate v-model="defaultValue" />
    </template>
  </van-field>
</template>

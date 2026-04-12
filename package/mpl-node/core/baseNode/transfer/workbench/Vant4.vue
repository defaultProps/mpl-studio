<script lang="ts" setup>
import { ref, watch } from 'vue'
import type { TransferFormProp, TransferValue } from '../define'

const props = defineProps<{ node: TransferFormProp }>()
const rateValue = ref<TransferValue>(props.node.rate.model)

watch(
  () => props.node.rate.model,
  (value: TransferValue) => {
    rateValue.value = value
  }
)
</script>

<template>
  <van-field :value="rateValue" type="number" label-align="top" clearable class="mpl-no-pointer">
    <template #label>
      {{ props.node.label.text }}
    </template>
    <template #input>
      <van-rate v-model="rateValue" />
    </template>
  </van-field>
</template>

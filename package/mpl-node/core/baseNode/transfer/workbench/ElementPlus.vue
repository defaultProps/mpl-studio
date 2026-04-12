<script lang="ts" setup>
import { ref, watch } from 'vue'
import { TransferFormProp, TransferValue } from '../define'

const props = defineProps<{ node: TransferFormProp }>()
const rateValue = ref<TransferValue>(props.node.rate.model)

const generateData = () => {
  const data: TransferValue = []
  for (let i = 1; i <= 15; i++) {
    data.push({
      key: `${i}`,
      label: `Option ${i}`,
      disabled: false
    })
  }
  return data
}

const data = ref<TransferValue>(generateData())
const value = ref([])

watch(
  () => props.node.rate.model,
  (value: TransferValue) => {
    rateValue.value = value
  }
)
</script>

<template>
  <div class="mpl-transfer-box">
    <el-transfer v-model="value" :data="data" />
  </div>
</template>

<style lang="less">
  .mpl-transfer-box {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>

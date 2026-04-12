<script lang="ts" setup>
import { ref, watch } from 'vue'
import { SwitchFormProp } from '../define'

const props = defineProps<{ node: SwitchFormProp }>()
const defaultValue = ref<boolean>(props.node.switch.model)

watch(
  () => props.node.switch.model,
  (value: boolean) => {
    defaultValue.value = value
  }
)
</script>

<template>
  <van-field :value="defaultValue" type="number" clearable class="mpl-no-pointer mpl-switch" input-align="right">
    <template #label>
      {{ props.node.label.text }}
    </template>
    <template #input>
      <van-switch v-model="defaultValue" />
    </template>
  </van-field>
</template>

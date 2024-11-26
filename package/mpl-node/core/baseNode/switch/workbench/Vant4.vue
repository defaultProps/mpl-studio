<script lang="ts" setup>
import { inject, ref, watch } from 'vue'
import { VISIBLE_NOTE } from '../../../../libs'
import { SwitchFormProp } from '../define'

const props = defineProps<{ node: SwitchFormProp }>()
const defaultValue = ref<boolean>(props.node.switch.model)

watch(
  () => props.node.switch.model,
  (value: any) => {
    defaultValue.value = value
  },
)

const visibleNote = inject(VISIBLE_NOTE, ref(false))
</script>

<template>
  <van-field :value="defaultValue" type="number" clearable class="mpl-no-pointer mpl-switch" input-align="right">
    <template #label>
      {{ props.node.label.text }}
      <mpl-note v-if="visibleNote"></mpl-note>
    </template>
    <template #input>
      <van-switch v-model="defaultValue" />
    </template>
  </van-field>
</template>
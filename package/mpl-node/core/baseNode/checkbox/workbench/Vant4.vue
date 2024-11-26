<script lang="ts" setup>
import { inject, ref, watch } from 'vue'
import { VISIBLE_NOTE } from '../../../../libs'
import { CheckboxFormProp } from '../define'

const props = defineProps<{ node: CheckboxFormProp }>()
const defaultValue = ref<string[]>(props.node.checkbox.model)

watch(
  () => props.node.checkbox.model,
  (value: any) => {
    defaultValue.value = value
  },
)

function formatSelect() {
  return ''
}

const visibleNote = inject(VISIBLE_NOTE, ref(false))
</script>

<template>
  <van-field :value="defaultValue.length" type="number" label-align="top" clearable class="mpl-no-pointer">
    <template #label>
      {{ props.node.label.text }}
      <mpl-note v-if="visibleNote"></mpl-note>
    </template>
    <template #input>
      <span v-if="!defaultValue.length" class="placeholder-span">{{ props.node.checkbox.placeholder }}</span>
      <span class="value-line" v-else>{{ formatSelect }}</span>
      <span class="delete-btn">
        <van-icon name="arrow" />
      </span>
    </template>
  </van-field>
</template>
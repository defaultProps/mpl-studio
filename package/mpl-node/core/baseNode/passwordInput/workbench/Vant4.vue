<script lang="ts" setup>
import { inject, ref, watch } from 'vue'
import { VISIBLE_NOTE } from '../../../../libs'
import { PasswordInputFormProp } from '../define'

const props = defineProps<{ node: PasswordInputFormProp }>()
const inputValue = ref<string>(props.node.input.model || '')

watch(
  () => props.node.input.model,
  (value: any) => {
    inputValue.value = value
  },
)

const visibleNote = inject(VISIBLE_NOTE, ref(false))
</script>

<template>
  <van-field v-model="inputValue" :placeholder="props.node.input.placeholder" label-align="top" clearable class="mpl-no-pointer">
    <template #label>
      {{  props.node.label.text }}
      <div v-show="visibleNote" class="mpl-input--note mpl-note square-btn" mpl="note">
        2
      </div>
    </template>
  </van-field>
</template>

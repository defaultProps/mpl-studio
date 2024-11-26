<script lang="ts" setup>
  import { inject, ref, watch } from 'vue'
  import { VISIBLE_NOTE } from '../../../../libs'
  import { Paragraph } from '../define'

  const props = defineProps<{ node: Paragraph }>()
  const defaultValue = ref<string>(props.node.model || '')

  watch(
    () => props.node.model,
    (value: any) => {
      defaultValue.value = value
    }
  )

  const visibleNote = inject(VISIBLE_NOTE, ref(false))
</script>

<template>
  <van-field label-align="top" clearable class="mpl-no-pointer">
    <template #label>
      {{ props.node.label }}
      <mpl-note v-if="visibleNote"></mpl-note>
    </template>
    <template #input>
      <div v-html="defaultValue"></div>
    </template>
  </van-field>

</template>